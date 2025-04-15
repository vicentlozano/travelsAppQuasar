<template>
  <div class="page-basic">
    <HeaderComponent class="absolute-top" />
    <div class="basic-container">
      <section class="paralax"></section>
      <h2>MIS ÚLTIMOS VIAJES</h2>
      <section class="last-travels">
        <TravelCard
          v-for="travel in travels"
          :key="travel.id"
          :name="travel.name"
          :days="travel.days"
          :places="travel.places"
          :price="travel.price"
          :background-image="travel.background_image"
          :travel_date="travel.travel_date"
          :user="travel.user_name"
        />
      </section>
      <section v-if="!travels.length" class="no-travels">
        <h3 class="message-empty">Sin viajes actualmente!</h3>
      </section>
    </div>
  </div>
</template>

<script setup>
import TravelCard from '../components/TravelCard.vue'
import { onMounted, ref } from 'vue'
import { getAllTravels } from '../utils/api/get.js'
import HeaderComponent from 'src/components/HeaderComponent.vue'

const travels = ref([])

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
$height-paralax-large: 70vh;
$height-paralax-small: 30vh;
.basic-container {
  display: grid;
  grid-template-rows: 0.6fr 0.2fr 1fr;
  height: 100%;
  width: 100%;
  margin-top: 3.4rem;
}
.paralax {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url('../assets/boat.jpg');
  background-attachment: fixed;
  background-position: center;
  background-color: $primary-color;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
}
.last-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  background-color: rgb(198, 228, 235);
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2em;
  font-weight: 700;
  height: 200px;
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
.page-basic {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: auto 1fr;
}
.absolute-top {
  position: fixed;
  top: 1;
  background-color: $gray-accent;
  height: 3.4rem;
}
@media (max-width: 1310px) {
  .last-travels {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
}
@media (max-width: 450px) {
  .last-travels {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
