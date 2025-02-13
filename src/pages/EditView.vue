<template>
  <div class="container">
    <TravelCard
      v-if="travel"
      :name="name"
      :days="days"
      :places="places"
      :price="price"
      :background-image="backgroundImage"
      :year="year"
      :id="travel.id"
    />
    <section class="edit">
      <form @submit.prevent="handleSubmit" class="edit">
        <input class="custom-input" v-model="name" placeholder="Introduce el nombre" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input class="custom-input" v-model="days" placeholder="Introduce los días" type="number" />
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
import { useRoute, useRouter } from 'vue-router'
import { getTravelById, updateTravel } from '@/api/travelsService'

const router = useRouter()
import TravelCard from '@/components/TravelCard.vue'

const route = useRoute()
const travel = ref(null)
const name = ref('')
const days = ref('')
const places = ref('')
const price = ref('')
const year = ref('')
const backgroundImage = ref('')
const errors = ref({})

onMounted(async () => {
  travel.value = await getTravelById(route.params.id)
  name.value = travel.value.name
  days.value = travel.value.days
  places.value = travel.value.places
  price.value = travel.value.price
  year.value = travel.value.year
  backgroundImage.value = travel.value.backgroundImage
})

const handleSubmit = async () => {
  errors.value = {}

  if (!name.value) errors.value.name = 'El nombre es obligatorio.'
  if (!days.value) errors.value.days = 'Los días son obligatorios.'
  if (!places.value) errors.value.places = 'Los lugares son obligatorios.'
  if (!price.value) errors.value.price = 'El precio es obligatorio.'
  if (!year.value) errors.value.year = 'El año es obligatorio.'
  if (!backgroundImage.value) errors.value.backgroundImage = 'La URL de la imagen es obligatoria.'

  if (Object.keys(errors.value).length === 0) {
    let travel = {
      id: route.params.id,
      name: name.value,
      days: days.value,
      places: places.value,
      price: price.value,
      year: year.value,
      backgroundImage: backgroundImage.value,
    }

    await updateTravel(route.params.id, travel)
    alert('El viaje se ha modificado correctamente!')
    router.push('/travels')
    console.log('Formulario válido. Guardando datos...')
  }
}
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
