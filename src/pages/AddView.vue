<template>
  <div class="container">
    <TravelCard
      v-if="backgroundImage"
      :name="name"
      :days="days"
      :places="places"
      :price="price"
      :background-image="backgroundImage"
      :year="year"
    />
    <q-dialog v-if="created" v-model="created" position="top" backdrop-filter="blur(4px)">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-grey">Viaje creado correctamente!</div>
          </div>

          <q-space />

          <q-btn flat round icon="close" @click="go" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <section class="edit">
      <form @submit.prevent="handleSubmit" class="edit">
        <input class="custom-input" v-model="name" placeholder="Introduce el nombre" required />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input
          class="custom-input"
          v-model="days"
          placeholder="Introduce los días"
          type="number"
          required
        />
        <span v-if="errors.days" class="error">{{ errors.days }}</span>

        <input
          class="custom-input"
          v-model="placesInput"
          type="text"
          @input="updatePlaces"
          placeholder="Introduce los lugares (separados por comas)"
          required
        />
        <span v-if="errors.places" class="error">{{ errors.places }}</span>

        <input
          class="custom-input"
          v-model="price"
          placeholder="Introduce el precio"
          type="number"
          required
        />
        <span v-if="errors.price" class="error">{{ errors.price }}</span>

        <input
          class="custom-input"
          v-model="year"
          placeholder="Introduce el año"
          type="number"
          required
        />
        <span v-if="errors.year" class="error">{{ errors.year }}</span>

        <input
          class="custom-input"
          v-model="backgroundImage"
          placeholder="URL de la imagen"
          type="url"
          required
        />
        <span v-if="errors.backgroundImage" class="error">{{ errors.backgroundImage }}</span>

        <button class="save" type="submit">Guardar</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTravel } from '../api/travelsService'
import TravelCard from '../components/TravelCard.vue'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const router = useRouter()

const name = ref('')
const days = ref('')
const places = ref([])
const placesInput = ref('')
const price = ref('')
const year = ref('')
const backgroundImage = ref('')
const errors = ref({})
const created = ref(false)

const handleSubmit = async () => {
  errors.value = {}
  const formato = /^[A-Za-z ]+$/
  if (name.value.length < 2 || !formato.test(name.value))
    errors.value.name = 'El nombre tiene contener mas de 1 caracter y no puede contener letras'
  if (days.value < 1) errors.value.days = 'Los días son obligatorios.'
  if (places.value.length < 1) errors.value.places = 'Los lugares son obligatorios.'
  if (price.value < 1) errors.value.price = 'El precio no es válido.'
  if (year.value < 1900 || year.value > new Date().getFullYear())
    errors.value.year = 'El año no es válido.'
  if (!backgroundImage.value) errors.value.backgroundImage = 'La URL de la imagen es obligatoria.'

  if (Object.keys(errors.value).length === 0) {
    let travel = {
      name: name.value,
      days: days.value,
      places: places.value,
      price: price.value,
      year: year.value,
      backgroundImage: backgroundImage.value,
      userId: auth.userId,
      userName: auth.username
    }
    try {
      await createTravel(travel)
      created.value = true
    } catch (error) {
      console.log('Error al crear el viaje:', error.response ? error.response.data : error.message)
    }
  }
}
const go = () => {
  router.push('/travels')
}

const updatePlaces = () => {
  places.value = placesInput.value
    .split(',')
    .map((place) => place.trim())
    .filter((place) => place.length > 0)
}

onMounted(() => {
  backgroundImage.value = 'https://www.reykjavikcars.com/es/assets/img/blog/702.png'
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
}
.edit {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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
</style>
