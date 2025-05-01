<template>
  <HeaderComponent />
  <div class="page-basic">
    <div class="search-input">
      <h3 class="title"> MIS VIAJES</h3>
      <q-input v-model="search" debounce="500" filled placeholder="Search" >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    </div>
    
    <section v-if="travels.length > 0" class="all-travels">
      <TravelCard
        v-for="travel in travelsSearched"
        :key="travel.id"
        :name="travel.name"
        :days="travel.days"
        :places="travel.places"
        :price="travel.price"
        :background-image="travel.background_image"
        :year="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="true"
        @delete="deleteTravelSelected"
      />
      <section class="card">
        <h4 class="add-text">Añadir nuevo viaje</h4>
        <RouterLink to="/add"><q-icon name="mdi-plus" size="30px" /></RouterLink>
      </section>
    </section>
  </div>
</template>

<script setup>
import TravelCard from 'src/components/TravelCard.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { getAllTravels } from '../utils/api/get'
const auth = useUserStore()
const travels = ref([])
const search = ref('')
const userId = ref(null)
import { deleteTravelById } from '../utils/api/delete'
const deleteTravelSelected = async (idSelected) => {
  try {
    await deleteTravelById({ id: idSelected })
    travels.value = travels.value.filter((travel) => travel.id !== idSelected)
  } catch (error) {
    console.log(error)
  }
}

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
//computed
const travelsSearched = computed(() => {
  return search.value
    ? travels.value.filter(
        (travel) =>
          removeAccents(travel.name.toLowerCase()).includes(
            removeAccents(search.value.toLowerCase()),
          ) ||
          (Array.isArray(travel.places) &&
            travel.places.some((place) =>
              removeAccents(place.toLowerCase()).includes(
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
  console.log(userId.value)
  try {
    let response = await getAllTravels()
    response = response.data
    console.log(response.data)
    travels.value = response.data.filter(travel=> travel.user_id === userId.value)
    console.log(travels.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style lang="scss" scoped>
.all-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;
  height: 100%;
  padding: 11.6rem 2rem 2rem 2rem;
  background-color: transparent;
}
.page-basic {
  display: grid;
  padding-top: 3.4rem;
  height: 100%;
  width: 100%;
  grid-template-rows: 0.2fr 1fr;
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
  height: 100%;
  width: 100%;
  padding:5rem;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgba(12, 12, 12, 0.905) 70%, rgba(12, 12, 12, 0.757));
  border-radius: 25px;
}
.title{
  color: white;
  z-index: 3;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(90deg, rgba(12, 12, 12, 0.905) 40%, rgba(12, 12, 12, 0.757));

}
@media (max-width: 1310px) {
  .all-travels {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
}
@media (max-width: 450px) {
  .all-travels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    padding-top: 12rem;
    padding-bottom: 3.6rem;
  }
  .page-basic {
    padding-top: 0rem;
  }
}
</style>
