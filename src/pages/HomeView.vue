<template>
  <div class="basic-container">
    <section class="paralax"><div class="paralax" aria-hidden="true"></div></section>
    <h2>MIS ÚLTIMOS VIAJES</h2>
    <section class="last-travels">
      <TravelCard
        v-for="travel in travels"
        :key="travel.id"
        :name="travel.name"
        :days="travel.days"
        :places="travel.places"
        :price="travel.price"
        :background-image="travel.backgroundImage"
        :year="travel.year"
      />
    </section>
    <section v-if="!travels.length" class="no-travels">
      <h3 class="message-empty">Sin viajes actualmente!</h3>
    </section>
    <section class="next-travels"></section>
    <q-dialog v-if="created" v-model="created" position="top" backdrop-filter="blur(4px)">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap bg-red" >
          <div>
            <div class="text-white ">{{ message }}</div>
          </div>

          <q-space />

          <q-btn flat round icon="close" @click="closePopUp" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import TravelCard from '../components/TravelCard.vue'
import { onMounted, ref,computed } from 'vue'
import { getAllTravels } from '../api/travelsService'

const travels = ref([])
const message = ref('')
const created = computed(()=> {
  return message.value? true : false
})
const closePopUp = () => {
  message.value = ''
}

onMounted(async () => {
  const response = await getAllTravels()
  if (response) {
    const totalTravels = response.result.length

    if (totalTravels > 4) {
      travels.value = response.result.slice(totalTravels - 4, totalTravels)
    } else {
      travels.value = response.result
    }
  } else {
    message.value = 'Connection to database failed'
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
  grid-template-rows: auto auto;
  height: 100%;
  width: 100%;
}
.paralax {
  display: flex;
  width: 100%;
  height: $height-paralax-large;
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
  background-color: azure;
  color: rgb(49, 47, 47);
}
.no-travels {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background-color: rgb(198, 228, 235);
  height: 80vh;
  color: black;
}
.no-travels h3 {
  font-weight: 500;
}

@media (max-width: 450px) {
  @media (max-width: 450px) {
    .last-travels {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    .card {
      width: 300px;
    }
  }
}
</style>
