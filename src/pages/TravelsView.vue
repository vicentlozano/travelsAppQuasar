<template>
  <div>
    <div class="container">
      <h2>TODOS MIS VIAJES</h2>
      <div v-if="travels.length == 0" class="spinner">
        <q-spinner-oval color="purple" size="4em" class="spinner" />
      </div>
      <section v-if="travels.length > 0" class="all-travels">
        <TravelCard
          v-for="travel in travels"
          :key="travel.id"
          :name="travel.name"
          :days="travel.days"
          :places="travel.places"
          :price="travel.price"
          :background-image="travel.background_image"
          :year="travel.travel_date"
          :crud="true"
          :user="travel.user_name"
          :id="travel.id"
          @delete="deleteTravelSelected"
        />
        <section class="card">
          <h4 class="add-text">Añadir nuevo viaje</h4>
          <button @click="goAdd" class="add"></button>
        </section>
      </section>

      <section v-if="travels.length == 0" class="no-travels">
        <h3 class="message-empty">Sin viajes actualmente!</h3>
        <section class="card">
          <h4 class="add-text">Añadir nuevo viaje</h4>
          <button @click="goAdd" class="add"></button>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllTravels } from '../utils/api/get'
import { deleteTravelById } from '../utils/api/delete'

import TravelCard from '../components/TravelCard.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const router = useRouter()
const travels = ref([])
const deleteTravelSelected = async (idSelected) => {
  try {
    await deleteTravelById({ id: idSelected })
    travels.value = travels.value.filter((travel) => travel.id !== idSelected)
  } catch (error) {
    console.log(error)
  }
}

const goAdd = () => {
  router.push('/add')
}
onMounted(async () => {
  const response = await getAllTravels()
  const userId = auth.userId
  travels.value = response.data.data.filter((travel) => travel.user_id === userId)
})
</script>

<style lang="scss" scoped>
.all-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  background-color: rgb(198, 228, 235);
}
.no-travels {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
  background-color: rgb(198, 228, 235);
  height: 80vh;
  color: black;
  transition: all 1s ease;
}

.no-travels h3 {
  font-weight: 500;
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  font-size: 2em;
  font-weight: 700;
  height: 200px;
  background-color: azure;
  color: rgb(49, 47, 47);
}
.add {
  background-image: url('../assets/icons/icons8-add-100.png');
  height: 100px;
  width: 100px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.card {
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  width: 400px;
  height: 100%;
  background-color: white;
  border-radius: 25px;
}
h4 {
  color: black;
  font-size: 2em;
  text-wrap: auto;
  font-weight: 700;
}
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 100%;
}
@media (max-width: 450px) {
  .all-travels {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .card {
    width: 300px;
  }
}
</style>
