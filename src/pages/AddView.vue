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
    <section class="edit">
      <form @submit.prevent="handleSubmit" class="edit">
        <input class="custom-input" v-model="name" placeholder="Introduce el nombre" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input class="custom-input" v-model="days" placeholder="Introduce los días" type="number" />
        <span v-if="errors.days" class="error">{{ errors.days }}</span>

        <!-- Modificación aquí para convertir la entrada en un array -->
        <input
          class="custom-input"
          v-model="placesInput"
          @input="updatePlaces"
          placeholder="Introduce los lugares (separados por comas)"
        />
        <span v-if="errors.places" class="error">{{ errors.places }}</span>

        <input
          class="custom-input"
          v-model="price"
          placeholder="Introduce el precio"
          type="number"
        />
        <span v-if="errors.price" class="error">{{ errors.price }}</span>

        <input class="custom-input" v-model="year" placeholder="Introduce el año" type="number" />
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTravel } from '../api/travelsService'
import TravelCard from '../components/TravelCard.vue'
const router = useRouter()

const name = ref('')
const days = ref('')
const places = ref([]) // Cambié a un array
const placesInput = ref('') // Para manejar el input como string
const price = ref('')
const year = ref('')
const backgroundImage = ref('')
const errors = ref({})

const handleSubmit = async () => {
  errors.value = {}

  if (!name.value) errors.value.name = 'El nombre es obligatorio.'
  if (!days.value) errors.value.days = 'Los días son obligatorios.'
  if (!places.value.length) errors.value.places = 'Los lugares son obligatorios.'
  if (!price.value) errors.value.price = 'El precio es obligatorio.'
  if (!year.value) errors.value.year = 'El año es obligatorio.'
  if (!backgroundImage.value) errors.value.backgroundImage = 'La URL de la imagen es obligatoria.'

  if (Object.keys(errors.value).length === 0) {
    let travel = {
      name: name.value,
      days: days.value,
      places: places.value, // Ahora es un array
      price: price.value,
      year: year.value,
      backgroundImage: backgroundImage.value,
    }
    await createTravel(travel)
    alert('El viaje se ha añadido correctamente!')
    router.push('/travels')
    console.log('Formulario válido. Guardando datos...')
  }
}

const updatePlaces = () => {
  // Convertir el valor de 'placesInput' en un array de lugares
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
  flex-direction: column;
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
