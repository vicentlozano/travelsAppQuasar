<template>
  <HeaderComponent class="fixed-header" />
  <div class="page-basic">
    <div class="search-input">
      <div class="title-image"><h3 class="title">Your friends travels</h3></div>
      <q-input v-model="search" debounce="500" filled placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <section :class="isBigWidth ? 'all-travels-full' : 'all-travels'" v-if="travels.length > 1">
      <TravelCard
        v-for="travel in travelsSearched"
        :key="travel.travel_id"
        :name="travel.name"
        :places="travel.places"
        :price="travel.price"
        :travel_date="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="false"
        :travel_id="travel.travel_id"
      />
    </section>
    <section v-else class="no-travels">
      <h2 class="title center">
        There are no travels from your friends yet. Connect with more people to see their
        adventures!
      </h2>
    </section>
  </div>
</template>

<script setup>
import TravelCard from 'src/components/TravelCard.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { getAllTravels } from '../utils/api'
import { useQuasar } from 'quasar'
const auth = useUserStore()
const travels = ref([])
const search = ref('')
const userId = ref(null)
const $q = useQuasar()

//methods

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

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
const isBigWidth = computed(() => $q.screen.width > 1600)
//hooks
onMounted(async () => {
  userId.value = auth.userId
  try {
    let response = await getAllTravels()
    response = response.data
    travels.value = response.data.filter((travel) => travel.user_id !== userId.value)
  } catch (error) {
    console.log(error)
  }
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
.all-travels-full {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1665px));
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
  min-height: 300px;
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
  font-size: 2em;
}
.center {
  width: 100%;
  justify-self: center;
  align-self: center;
  text-align: center;
}

.fixed-header {
  position: fixed;
}
.no-travels {
  display: flex;
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
    display: flex;
    width: 100%;
    height: 100%;
    padding: 7.4rem 0.2rem 3.6rem 0.2rem;
  }
  .center {
    font-size: 1.5em;
  }
}
</style>
