<template>
  <q-dialog
    v-model="isShow"
    @hide="emits('close-dialog', false)"
    backdrop-filter="blur(5px) saturate(150%)"
  >
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      active-color="purple"
      :contracted="mobilView"
      class="stepper"
    >
      <q-step :name="1" prefix="1" title="Select travel settings">
        <section class="settings">
          <div class="selects">
            <div class="title-selects">
              <q-avatar color="orange" text-color="white" size="32px"> 1 </q-avatar>
              <span>Select country</span>
            </div>
            <q-select
              filled
              dense
              use-input
              input-debounce="0"
              @filter="filterFn"
              :behavior="mobilView ? '' : 'menu'"
              :style="
                mobilView ? 'width: 100%; padding-bottom:20px' : 'width: 250px; padding-bottom:20px'
              "
              v-model="country"
              :options="options"
              label="Country"
              menu-anchor="bottom left"
            />
          </div>
          <div class="selects">
            <div class="title-selects">
              <q-avatar color="orange" text-color="white" size="32px"> 2 </q-avatar>
              <span>Select number of places</span>
            </div>
            <q-select
              filled
              dense
              :behavior="mobilView ? '' : 'menu'"
              optionsdense
              :style="
                mobilView ? 'width: 100%; padding-bottom:20px' : 'width: 250px; padding-bottom:20px'
              "
              v-model="numberPlaces"
              :options="[1, 2, 3, 4, 5]"
              label="Travel Places"
            />
          </div>
        </section>
      </q-step>

      <q-step :name="2" prefix="2" title="Introduce travel's date and price">
        <section class="settings">
          <div class="selects-date">
            <div class="title-selects">
              <q-avatar color="orange" text-color="white" size="32px"> 3 </q-avatar>
              <span>Select date for travel</span>
            </div>
            <q-input
              filled
              dense
              v-model="dateRange"
              :style="mobilView ? 'width: 100%' : 'width: 250px'"
              :rules="[
                (val) =>
                  validateDateRange(val) ||
                  'Enter a valid date or date range (e.g., 2025/05/07 - 2025/05/09)',
                (val) => validateDateNotFuture(val) || 'Dates cannot be in the future',
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateForm" range>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="selects-date">
            <div class="title-selects">
              <q-avatar color="orange" text-color="white" size="32px"> 4 </q-avatar>
              <span>Select travel's price</span>
            </div>
            <q-input
              filled
              dense
              v-model="priceForm"
              label="price"
              :style="mobilView ? 'width: 100%' : 'width: 250px'"
              type="number"
              :rules="[(val) => (!!val && Number(val) > 0) || 'The price must be greater than 0']"
            />
          </div>
        </section>
      </q-step>

      <q-step :name="3" prefix="3" title="Plsace and Image">
        <q-stepper
          v-model="intoStep"
          ref="intoStepper"
          animated
          style="backdrop-filter: blur(20px)"
          active-color="purple"
          :contracted="mobilView"
          class="stepper"
        >
          <q-step
            v-for="(place, index) of places"
            :name="index + 1"
            :key="index"
            :title="`Place ${index + 1}`"
            :prefix="index + 1"
            contracted
            ><section class="settings">
              <div class="selects-date">
                <div class="title-selects">
                  <q-avatar color="orange" text-color="white" size="32px"
                    ><q-icon name="place"
                  /></q-avatar>
                  <span>Select travel's place</span>
                </div>
                <q-input
                  filled
                  dense
                  v-model="places[index].place"
                  label="Place's name"
                  :style="mobilView ? 'width: 100%' : 'width: 250px'"
                  :rules="[(val) => !!val || 'This field cannot be empty']"
                />
              </div>
              <div class="selects-date">
                <div class="title-selects">
                  <q-avatar color="orange" text-color="white" size="32px">
                    <q-icon name="image" />
                  </q-avatar>
                  <span>Select travel's image</span>
                </div>
                <div>
                  <q-file
                    v-model="place.imageFile"
                    filled
                    dense
                    class="ellipsis"
                    :style="mobilView ? 'width: 100%' : 'width: 250px'"
                    name="avatar"
                    label-color="black"
                    label="Add your photo"
                    accept="image/*"
                    :rules="[
                      (val) => !!val || 'The image is required',
                      (val) =>
                        (val && val.type && val.type.startsWith('image/')) ||
                        'Only image files are allowed',
                    ]"
                    @update:model-value="onFileChange(index)"
                  >
                    <template v-slot:append>
                      <q-icon
                        v-if="place.imageFile !== null"
                        name="close"
                        @click.stop.prevent="place.imageFile = null"
                        class="cursor-pointer"
                      />
                      <q-icon
                        v-if="place.imageFile === null"
                        round
                        dense
                        flat
                        name="cloud_upload"
                      />
                    </template>
                  </q-file>
                </div>
              </div>
            </section>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="
                  intoStep !== places.length ? $refs.intoStepper.next() : $refs.stepper.next()
                "
                color="deep-orange"
                label="Continue"
                :disable="!isIntoStepValid"
              />
              <q-btn
                flat
                color="deep-orange"
                @click="intoStep > 1 ? $refs.intoStepper.previous() : $refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-step>
      <q-step :name="4" prefix="4" title="Previsualization">
        <TravelCard
          :name="country"
          :places="places"
          :price="priceForm"
          :travel_date="dateForm"
          :user="auth.username"
          :id="auth.id"
          :crud="false"
        />
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation v-if="step !== 3">
          <q-btn
            @click="$refs.stepper.next()"
            color="deep-orange"
            :label="step === 4 ? 'Finish' : 'Continue'"
            :disable="!isStepValid"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useUserStore } from '../stores/user'
import TravelCard from './TravelCard.vue'
//data
const props = defineProps({
  show: Boolean,
})
const emits = defineEmits(['close-dialog', 'delete'])
const isShow = ref(false)
const auth = useUserStore()
const places = ref([{ place: '', image: '', imageFile: null }])
const slide = ref(places.value.length > 0 ? places.value[0].place : '')
const step = ref(1)
const intoStep = ref(1)
const numberPlaces = ref(1)
const country = ref('')
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const options = ref()
const dateForm = ref('')
const priceForm = ref(null)

const optionsCountry = [
  'Afganistán',
  'Albania',
  'Alemania',
  'Andorra',
  'Angola',
  'Antigua y Barbuda',
  'Arabia Saudita',
  'Argelia',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaiyán',
  'Bahamas',
  'Bangladés',
  'Barbados',
  'Baréin',
  'Bélgica',
  'Belice',
  'Benín',
  'Bielorrusia',
  'Birmania',
  'Bolivia',
  'Bosnia y Herzegovina',
  'Botsuana',
  'Brasil',
  'Brunéi',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Bután',
  'Cabo Verde',
  'Camboya',
  'Camerún',
  'Canadá',
  'Catar',
  'Chad',
  'Chile',
  'China',
  'Chipre',
  'Ciudad del Vaticano',
  'Colombia',
  'Comoras',
  'Corea del Norte',
  'Corea del Sur',
  'Costa de Marfil',
  'Costa Rica',
  'Croacia',
  'Cuba',
  'Dinamarca',
  'Dominica',
  'Ecuador',
  'Egipto',
  'El Salvador',
  'Emiratos Árabes Unidos',
  'Eritrea',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Estados Unidos',
  'Estonia',
  'Etiopía',
  'Filipinas',
  'Finlandia',
  'Fiyi',
  'Francia',
  'Gabón',
  'Gambia',
  'Georgia',
  'Ghana',
  'Granada',
  'Grecia',
  'Guatemala',
  'Guyana',
  'Guinea',
  'Guinea-Bisáu',
  'Guinea Ecuatorial',
  'Haití',
  'Honduras',
  'Hungría',
  'India',
  'Indonesia',
  'Irak',
  'Irán',
  'Irlanda',
  'Islandia',
  'Islas Marshall',
  'Islas Salomón',
  'Israel',
  'Italia',
  'Jamaica',
  'Japón',
  'Jordania',
  'Kazajistán',
  'Kenia',
  'Kirguistán',
  'Kiribati',
  'Kuwait',
  'Laos',
  'Lesoto',
  'Letonia',
  'Líbano',
  'Liberia',
  'Libia',
  'Liechtenstein',
  'Lituania',
  'Luxemburgo',
  'Macedonia del Norte',
  'Madagascar',
  'Malasia',
  'Malaui',
  'Maldivas',
  'Malí',
  'Malta',
  'Marruecos',
  'Mauricio',
  'Mauritania',
  'México',
  'Micronesia',
  'Moldavia',
  'Mónaco',
  'Mongolia',
  'Montenegro',
  'Mozambique',
  'Namibia',
  'Nauru',
  'Nepal',
  'Nicaragua',
  'Níger',
  'Nigeria',
  'Noruega',
  'Nueva Zelanda',
  'Omán',
  'Países Bajos',
  'Pakistán',
  'Palaos',
  'Panamá',
  'Papúa Nueva Guinea',
  'Paraguay',
  'Perú',
  'Polonia',
  'Portugal',
  'Reino Unido',
  'República Centroafricana',
  'República Checa',
  'República del Congo',
  'República Democrática del Congo',
  'República Dominicana',
  'Ruanda',
  'Rumanía',
  'Rusia',
  'Samoa',
  'San Cristóbal y Nieves',
  'San Marino',
  'San Vicente y las Granadinas',
  'Santa Lucía',
  'Santo Tomé y Príncipe',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leona',
  'Singapur',
  'Siria',
  'Somalia',
  'Sri Lanka',
  'Suazilandia',
  'Sudáfrica',
  'Sudán',
  'Sudán del Sur',
  'Suecia',
  'Suiza',
  'Surinam',
  'Tailandia',
  'Tanzania',
  'Tayikistán',
  'Timor Oriental',
  'Togo',
  'Tonga',
  'Trinidad y Tobago',
  'Túnez',
  'Turkmenistán',
  'Turquía',
  'Tuvalu',
  'Ucrania',
  'Uganda',
  'Uruguay',
  'Uzbekistán',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Yibuti',
  'Zambia',
  'Zimbabue',
]
// methods

const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 650 ? (mobilView.value = true) : (mobilView.value = false)
}
const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = optionsCountry
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = optionsCountry.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}
const validateDateRange = (val) => {
  if (!val) return false

  const singleDateRegex = /^\d{4}\/\d{2}\/\d{2}$/

  const rangeDateRegex = /^\d{4}\/\d{2}\/\d{2} - \d{4}\/\d{2}\/\d{2}$/

  if (singleDateRegex.test(val)) {
    return true
  } else if (rangeDateRegex.test(val)) {
    const [start, end] = val.split(' - ')
    return new Date(start) <= new Date(end)
  }

  return false
}

const validateDateNotFuture = (val) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!val) return false

  const singleDateRegex = /^\d{4}\/\d{2}\/\d{2}$/
  if (singleDateRegex.test(val)) {
    return new Date(val) <= today
  }

  const rangeDateRegex = /^\d{4}\/\d{2}\/\d{2} - \d{4}\/\d{2}\/\d{2}$/
  if (rangeDateRegex.test(val)) {
    const [start, end] = val.split(' - ')
    return new Date(start) <= today && new Date(end) <= today
  }

  return false
}

const onFileChange = (index) => {
  places.value[index].image = URL.createObjectURL(places.value[index].imageFile)
}
//computed
const dateRange = computed({
  get() {
    if (dateForm.value) {
      if (dateForm.value.from && dateForm.value.to) {
        // Si hay un rango de fechas
        return `${dateForm.value.from} - ${dateForm.value.to}`
      } else if (dateForm.value) {
        // Si solo hay una fecha
        return dateForm.value
      }
    }
    return ''
  },
  set(val) {
    if (val.includes(' - ')) {
      // Si es un rango de fechas
      const [from, to] = val.split(' - ')
      dateForm.value = { from, to }
    } else {
      // Si es una sola fecha
      dateForm.value = { from: val, to: null }
    }
  },
})
const isStepValid = computed(() => {
  if (step.value === 1) {
    return !!country.value && numberPlaces.value > 0
  } else if (step.value === 2) {
    // Validación para el paso 2
    return !!dateRange.value && Number(priceForm.value) > 0
  } else if (step.value === 3) {
    // Validación para el paso 3 (si aplica)
    return true // Por ejemplo, si no hay validación en el último paso
  }
  return false
})
const isIntoStepValid = computed(() => {
  const currentIndex = intoStep.value - 1
  const currentPlace = places.value[currentIndex]
  if (!currentPlace) return false

  const isPlaceValid = !!currentPlace.place && currentPlace.place.trim() !== ''
  const isImageValid =
    !!currentPlace.imageFile &&
    currentPlace.imageFile.type &&
    currentPlace.imageFile.type.startsWith('image/')

  return isPlaceValid && isImageValid
})

//watch
watch(
  () => props.show,
  (newValue) => {
    isShow.value = newValue
  },
)
watch(numberPlaces, (newVal) => {
  const currentLength = places.value.length
  console.log(places.value.length)
  if (newVal > currentLength) {
    // Añadir nuevos objetos si hace falta
    for (let i = currentLength; i < newVal; i++) {
      places.value.push({ place: '', image: '', imageFile: '' })
    }
  } else if (newVal < currentLength) {
    // Eliminar si hay más de la cuenta
    places.value.splice(newVal)
  }
})
watch(places, (newVal) => {
  console.log(newVal[0].place)
  slide.value = newVal[0].place
})

//hooks
onMounted(() => {
  mobilView.value = window.innerWidth < 650
  window.addEventListener('resize', updateWidth)
})
</script>

<style lang="scss" scoped>
.stepper {
  height: fit-content;
  min-width: fit-content;
}
.settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 1rem;
}
.selects {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: 1rem;
  place-items: center;
}
.selects-date {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: 1rem;
  place-items: center;
}
.title-selects {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.7rem;
  align-items: center;
  justify-self: start;
}
.carrusel {
  width: 100%;
  min-height: 42vh;
  min-height: 300px;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.gadgets {
  display: grid;
  grid-template-columns: 1fr min-content;
  justify-content: space-between;
  width: 100%;
}
.data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(24, 24, 24, 0.831);
}
.calendar {
  width: 190px;
}
.carrusel :deep(.q-carousel__arrow) {
  backdrop-filter: blur(1px);
  place-self: center;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.3rem;
  place-items: center;
}
.edit {
  border-radius: 50%;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.7) !important;
  color: #fff !important;
  border-radius: 50%;
}
.plus:hover {
  background: rgba(0, 0, 0, 0.364) !important;
}
.btn-calendar {
  display: flex;
  width: 100%;
  place-content: center;
}
:deep(input[type='number'])::-webkit-outer-spin-button,
:deep(input[type='number'])::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ocultar spinners en Firefox */
:deep(input[type='number']) {
  -moz-appearance: textfield;
  appearance: textfield;
}
@media (max-width: 1310px) {
  .travel-image {
    min-height: 200px;
    min-width: 300px;
    background-image: url(../assets/landsphoto.jfif);
    border-bottom-left-radius: 0px;
    border-top-right-radius: 25px;
  }

  h3 {
    border-bottom-left-radius: 0px;
  }
}

@media (max-width: 450px) {
  .carrusel {
    height: 30vh;
    aspect-ratio: auto;
  }
  .settings {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2rem;
    width: 100%;
    place-items: center;
  }
  .stepper {
    height: 100%;
    width: 100%;
    display: grid;
    padding-bottom: 1rem;
    grid-template-rows: min-content 1fr min-content;
  }
  :deep(.q-stepper__step-content) {
    height: 100%;
  }
  :deep(.q-stepper__step-inner) {
    display: grid;
    place-items: center;
    height: 100%;
  }
  .selects {
    width: 100%;
  }
  .selects-date {
    width: 100%;
  }
}
</style>
