<template>
  <HeaderComponent class="fixed-header" />

  <div class="page-basic">
    <div class="container">
      <TravelCard
        v-if="travel"
        :name="name"
        :days="days"
        :places="places"
        :price="price"
        :background-image="backgroundImage"
        :travel_date="travel_date"
        :id="travel._id"
      />
      <section class="edit">
        <form @submit.prevent="handleSubmit" class="edit">
          <input class="custom-input" v-model="name" placeholder="Introduce el nombre" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>

          <input
            class="custom-input"
            v-model="days"
            placeholder="Introduce los días"
            type="number"
          />
          <span v-if="errors.days" class="error">{{ errors.days }}</span>

          <input class="custom-input" v-model="places" placeholder="Introduce los lugares" />
          <span v-if="errors.places" class="error">{{ errors.places }}</span>

          <input
            class="custom-input"
            v-model="price"
            placeholder="Introduce el precio"
            type="number"
          />
          <span v-if="errors.price" class="error">{{ errors.price }}</span>

          <input
            class="custom-input"
            v-model="travel_date"
            placeholder="introduce la fecha"
            type="date"
          />
          <span v-if="errors.year" class="error">{{ errors.year }}</span>

          <input
            class="custom-input"
            v-model="backgroundImage"
            placeholder="URL de la imagen"
            type="url"
          />
          <span v-if="errors.backgroundImage" class="error">{{ errors.backgroundImage }}</span>

          <button class="save" type="submit">Guardar</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTravelById, updateTravel } from '../utils/api'
import HeaderComponent from 'src/components/HeaderComponent.vue'

const router = useRouter()
import TravelCard from '../components/TravelCard.vue'

const route = useRoute()
const travel = ref(null)
const name = ref('')
const days = ref('')
const places = ref('')
const price = ref('')
const travel_date = ref('')
const backgroundImage = ref('')
const errors = ref({})
const userID = ref(null)

onMounted(async () => {
  try {
    travel.value = await getTravelById({ id: route.params.id })
    if (!travel.value.data.error.status) {
      travel.value = travel.value.data
      name.value = travel.value.data.name
      days.value = travel.value.data.days
      places.value = travel.value.data.places
      price.value = travel.value.data.price
      travel_date.value = travel.value.data.travel_date
      console.log(travel_date.value)
      backgroundImage.value = travel.value.data.background_image
      userID.value = travel.value.data.user_id
    }
  } catch (error) {
    console.log(error)
  }
})

const handleSubmit = async () => {
  errors.value = {}

  if (!name.value) errors.value.name = 'El nombre es obligatorio.'
  if (!days.value) errors.value.days = 'Los días son obligatorios.'
  if (!places.value) errors.value.places = 'Los lugares son obligatorios.'
  if (!price.value) errors.value.price = 'El precio es obligatorio.'
  if (!travel_date.value) errors.value.travel_date = 'El año es obligatorio.'
  if (!backgroundImage.value) errors.value.backgroundImage = 'La URL de la imagen es obligatoria.'

  if (Object.keys(errors.value).length === 0) {
    let travel = {
      id: route.params.id,
      name: name.value,
      days: days.value,
      places: places.value,
      price: price.value,
      travel_date: travel_date.value,
      backgroundImage: backgroundImage.value,
    }

    await updateTravel(travel)
    alert('El viaje se ha modificado correctamente!')
    router.push('/media')
    console.log('Formulario válido. Guardando datos...')
  }
}
</script>

<style scoped>
.fixed-header {
  position: fixed;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  gap: 1rem;
}
.edit {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 3rem;
  text-align: center;
}
.save {
  background-color: rgb(39, 58, 97);
  border-radius: 15px;
  color: white;
  border: none;
  padding: 0.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.4s ease;
}
.save:hover {
  background-color: rgb(62, 179, 23);
  color: rgb(39, 58, 97);
}
.custom-input {
  border: none;
  border-radius: 15px;
  padding: 0.4rem;
  text-align: center;
}
.error {
  color: red;
  font-size: 0.8rem;
}
.page-basic {
  display: grid;
  padding-top: 3.4rem;
  height: 100%;
  width: 100%;
  place-items: center;
  grid-template-rows: 1fr;
}

@media (max-width: 450px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 0rem;
    padding-bottom: 3.6rem;

    gap: 1rem;
  }
}
</style>
