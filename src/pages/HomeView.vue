<template>
  <HeaderComponent class="fixed-header" />
  <div class="basic-container">
    <h2 v-if="!isBigWidth" class="title">Friends travels</h2>
    <section v-if="travels.length > 0" class="last-travels">
      <TravelCard
        v-for="travel in travels"
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
      <h3 class="message-empty">Sin viajes actualmente!</h3>
    </section>
  </div>
</template>

<script setup>
import TravelCard from '../components/TravelCard.vue'
import { onMounted, ref,computed } from 'vue'
import { getAllTravels } from '../utils/api/get.js'
import { useQuasar } from 'quasar'

import HeaderComponent from 'src/components/HeaderComponent.vue'
//data
const travels = ref([])
const $q = useQuasar()

//computed
const isBigWidth = computed(() => $q.screen.width > 1400)

onMounted(async () => {
  try {
    let response = await getAllTravels()
    response = response.data
    const totalTravels = response.data.length

    if (totalTravels > 4) {
      travels.value = response.data.slice(totalTravels - 4, totalTravels)
    } else {
      travels.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<style lang="scss" scoped>
$primary-color: black;
$secondary-color: white;
$font-size-large: 3em;
$font-size-medium: 2em;
$font-weight-bold: 900;
$gap-spacing: 2rem;
$margin-spacing: 3rem;

.basic-container {
  display: grid;
  grid-template-rows: min-content 1fr;
  padding-top: 3.4rem;
  height: 100%;
  width: 100%;
}

.last-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 0.1rem;
  justify-items: start;
  align-items: start;
  height: min-content;
  background-color: transparent;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 3.4rem;
  width: 100%;
  font-size: 2em;
  font-weight: 700;
  height: 5rem;
  background-color: rgb(44, 46, 46);
  color: white;
}
.no-travels {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background-color: transparent;
  height: 80vh;
  color: black;
}
.no-travels h3 {
  font-weight: 500;
}

.absolute-top {
  position: fixed;
  top: 1;
  background-color: $gray-accent;
  height: 3.4rem;
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
@media (min-width: 450px) and (max-width: 1310px) {
  .last-travels {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
}

@media (max-width: 450px) {
  .basic-container {
    display: grid;
    grid-template-rows: 5rem min-content 1fr;
    height: 100%;
    width: 100%;
    padding-top: 0rem;
  }
  h2 {
    position: sticky;
    top: 0;
    width: 100%;
    grid-row: 1/2;
    font-size: 2em;
    font-weight: 700;
    background-color: rgb(44, 46, 46);
    color: white;
  }
  .last-travels {
    grid-row: 3/3;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-bottom: 3.4rem;
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
