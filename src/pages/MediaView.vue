<template>
  <HeaderComponent class="fixed-header" />
  <div class="page-basic">
    <div class="search-input">
      <div class="title-image"><h3 class="title">Mis viajes</h3></div>
      <q-input v-model="search" debounce="500" filled placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <section class="all-travels" v-if="travels.length > 0">
      <TravelCard
        v-for="travel in travelsSearched"
        :key="travel.travel_id"
        :name="travel.name"
        :places="travel.places"
        :price="travel.price"
        :travel_date="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="true"
        @delete="deleteTravelSelected"
        @edit-travel="editTravel"
        :travel_id="travel.travel_id"
      />
      <section class="card">
        <h4 class="add-text">Añadir nuevo viaje</h4>
        <q-btn
          push
          round
          dense
          text-color="white"
          icon="mdi-plus"
          size="30px"
          @click="showDialog = true"
        />
      </section>
    </section>
    <section v-else class="no-travels" v-show="actualShowDialog">
      <h2 class="title center">
        You don't have any trips yet. Start creating one to share your journey!
      </h2>
      <section class="card">
        <h4 class="add-text">Añadir nuevo viaje</h4>
        <q-btn
          push
          round
          dense
          text-color="white"
          icon="mdi-plus"
          size="30px"
          @click="showDialog = true"
        />
      </section>
    </section>
    <CreateTravelDialog
      :show="showDialog"
      :dataTravel="dataTravelEdit"
      :isEdit="travelIdEdit"
      @close-dialog="closeDialog"
      @new-travel="checkTravels"
      @clean-props="cleanData"
      @delete-old-travel="deleteOldTravel"
    />
  </div>
</template>

<script setup>
import TravelCard from 'src/components/TravelCard.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { getAllTravels } from '../utils/api'
import { deleteTravelById } from '../utils/api/delete'
import CreateTravelDialog from 'src/components/CreateTravelDialog.vue'
const auth = useUserStore()
const travels = ref([])
const showDialog = ref(false)
const search = ref('')
const userId = ref(null)
const dataTravelEdit = ref(null)
const travelIdEdit = ref(null)
const actualShowDialog = ref('false')

//methods
const closeDialog = (bool) => {
  showDialog.value = bool
}
const deleteTravelSelected = async (idAndUrls) => {
  try {
    await deleteTravelById(idAndUrls)
    travels.value = travels.value.filter((travel) => travel.travel_id !== idAndUrls.id)
  } catch (error) {
    console.log(error)
  }
}
const deleteOldTravel = async (id) => {
  let travel = travels.value.filter((travel) => travel.travel_id === id)
  let idAndUrls = { id: id, urls: travel[0].places.map((place) => place.image) }
  try {
    await deleteTravelById(idAndUrls)
    travels.value = travels.value.filter((travel) => travel.travel_id !== idAndUrls.id)
  } catch (error) {
    console.log(error)
  }
}

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const checkTravels = async () => {
  try {
    let response = await getAllTravels()
    response = response.data
    travels.value = response.data.filter((travel) => travel.user_id === userId.value)
  } catch (error) {
    console.log(error)
  }
}
const editTravel = async (id) => {
  dataTravelEdit.value = travels.value.find((travel) => travel.travel_id === id)
  travelIdEdit.value = id
  showDialog.value = true
}
const cleanData = () => {
  dataTravelEdit.value = null
  travelIdEdit.value = null
}
//computed

const travelsSearched = computed(() => {
  return search.value.trim().length > 0
    ? travels.value.filter(
        (travel) =>
          removeAccents(travel.name.toLowerCase()).includes(
            removeAccents(search.value.toLowerCase()),
          ) ||
          (Array.isArray(travel.places) &&
            travel.places.some((place) =>
              removeAccents(place.place.toLowerCase()).includes(
                removeAccents(search.value.toLowerCase()),
              ),
            )) ||
          removeAccents(travel.user_name.toLowerCase()).includes(
            removeAccents(search.value.toLowerCase()),
          ),
      )
    : travels.value
})
//hooks
onMounted(async () => {
  userId.value = auth.userId
  try {
    let response = await getAllTravels()
    response = response.data
    travels.value = response.data.filter((travel) => travel.user_id === userId.value)
  } catch (error) {
    console.log(error)
  }
  setTimeout(() => {
    actualShowDialog.value = true
  }, 3000)
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.all-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 0.1rem;
  justify-items: start;
  align-items: start;
  height: min-content;
  padding: 7.4rem 0.5rem 0.5rem 0.5rem;
  background-color: transparent;
}
.page-basic {
  display: grid;
  padding-top: 3.4rem;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr;
}

.search-input {
  width: 100%;
  position: fixed;
  z-index: 3;
  background-color: white;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 350px;
  padding: 5rem;
  gap: 1rem;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(90deg, rgba(12, 12, 12, 0.905) 70%, rgba(12, 12, 12, 0.757));
}
.title-image {
  text-align: center;
  align-self: center;
  color: rgba(24, 24, 24, 0.831);
}
.title {
  font-family: 'Pacifico', cursive;
  font-weight: 300;
  padding: 0.2rem;
  font-style: italic;
  background-color: rgb(44, 46, 46);
  color: whitesmoke;
  font-size: 2em;
}

.fixed-header {
  position: fixed;
}
.title {
  font-family: 'Pacifico', cursive;
  font-weight: 300;
  padding: 0.2rem;
  font-style: italic;
  font-size: 2em;
}
.center {
  width: 100%;
  justify-self: center;
  align-self: center;
  text-align: center;
  background-color: transparent;
  color: black;
}
.no-travels {
  display: grid;
  grid-template-rows: 0.7fr 1fr;
  width: 100%;
  height: 100%;
  padding: 7.4rem 0.5rem 0.5rem 0.5rem;
}
@media (min-width: 450px) and (max-width: 1310px) {
  .all-travels {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
}

@media (max-width: 450px) {
  .all-travels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-top: 12rem;
    padding-bottom: 3.6rem;
    padding: 7.4rem 0.2rem 3.6rem 0.2rem;
  }
  .page-basic {
    padding-top: 0rem;
  }
  .card {
    height: 30vh;
  }
  .no-travels {
    padding: 7.4rem 0.2rem 3.6rem 0.2rem;
  }
  .center {
    font-size: 1.5em;
  }
}
</style>
