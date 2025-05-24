<template>
  <HeaderComponent class="fixed-header" />
  <div class="page-basic">
    <CreateOrEditTravel
      :name="name"
      :days="days"
      :price="price"
      :travel_date="travel_date"
    />
    <section class="edit" v-show="false">
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
          v-model="travel_date"
          placeholder="Introduce la fecha"
          type="date"
          required
        />
        <span v-if="errors.travel_date" class="error">{{ errors.travel_date }}</span>

        <input
          class="custom-input"
          v-model="backgroundImage"
          placeholder="URL de la imagen"
          type="url"
          required
        />
        <span v-if="errors.backgroundImage" class="error">{{ errors.backgroundImage }}</span>

        <q-btn class="save" type="submit" label='Guardar'/>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useRouter } from 'vue-router'
import { createTravel } from '../utils/api/post'
import CreateOrEditTravel from '../components/CreateOrEditTravel.vue'
import { useUserStore } from '../stores/user'
import { notifyError, notifySuccess } from 'src/utils/utilsNotify'
const auth = useUserStore()
const router = useRouter()

const name = ref('España')
const days = ref('')
const places = ref([])
const placesInput = ref('')
const price = ref(0)
const travel_date = ref('')
const backgroundImage = ref('')
const errors = ref({})

const handleSubmit = async () => {
  errors.value = {}
  const formato = /^[A-Za-z ]+$/
  if (name.value.length < 2 || !formato.test(name.value))
    errors.value.name = 'El nombre tiene contener mas de 1 caracter y no puede contener letras'
  if (days.value < 1) errors.value.days = 'Los días son obligatorios.'
  if (places.value.length < 1) errors.value.places = 'Los lugares son obligatorios.'
  if (price.value < 1) errors.value.price = 'El precio no es válido.'
  // if (travel_date)
  //   errors.value.travel_date = 'La fecha no es válido.'
  if (!backgroundImage.value) errors.value.backgroundImage = 'La URL de la imagen es obligatoria.'

  if (Object.keys(errors.value).length === 0) {
    let travel = {
      name: name.value,
      days: days.value,
      places: places.value,
      price: price.value,
      travel_date: travel_date.value,
      user_id: auth.userId,
      user_name: auth.username,
    }
    try {
      const response = await createTravel({ travel: travel })
      if (!response.data.error.status) {
        notifySuccess('Viaje creado correctamente!')
        go()
      }
    } catch (error) {
      notifyError('Error al crear el viaje:', error)
      console.log('Error al crear el viaje:', error.response ? error.response.data : error.message)
    }
  }
}
const go = () => {
  router.push('/media')
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
.fixed-header {
  position: fixed;
}
.page-basic {
  display: grid;
  padding-top: 3.4rem;
  place-items: center;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr;
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
  width: fit-content;
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
@media (max-width: 450px) {
.page-basic{
  padding-top: 0;
  padding-bottom: 3.4rem;
}
}
</style>
