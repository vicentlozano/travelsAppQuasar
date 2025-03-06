<template>
  <div class="section-search">
    <q-input v-model="search" debounce="500" filled placeholder="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <section v-if="travels.length > 0" class="all-travels">
      <TravelCard
        v-for="travel in travelsSearched"
        :key="travel.id"
        :name="travel.name"
        :days="travel.days"
        :places="travel.places"
        :price="travel.price"
        :background-image="travel.backgroundImage"
        :year="travel.year"
        :user="travel.userName"
        :id="travel._id"
      />
    </section>
  </div>
</template>

<script setup>
import TravelCard from 'src/components/TravelCard.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { getAllTravels } from '../api/travelsService'

const auth = useUserStore()
const travels = ref([])
const search = ref('')
const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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
          removeAccents(travel.userName.toLowerCase()).includes(
            removeAccents(search.value.toLowerCase()),
          ),
      )
    : travels.value
})
onMounted(async () => {
  const response = await getAllTravels()
  const userId = auth.userId
  console.log(userId)
  console.log(response.result)
  travels.value = response.result
})
</script>

<style lang="scss" scoped>
.section-search {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  gap: 1rem;
}
.all-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
  background-color: rgb(198, 228, 235);
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
    padding: 0px;
  }
}
</style>
