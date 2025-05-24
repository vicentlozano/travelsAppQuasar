<template>
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
            :style="mobilView ? 'width: 100%' : 'width: 200px'"
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
            :style="mobilView ? 'width: 100%' : 'width: 200px'"
            v-model="numberPlaces"
            :options="[1, 2, 3, 4, 5]"
            label="Travel Places"
          />
        </div>
      </section>
    </q-step>

    <q-step :name="2" prefix="2" title="Introduce travel's date and price" >
      <section class="settings">
        <div class="selects-date">
          <div class="title-selects">
            <q-avatar color="orange" text-color="white" size="32px"> 3 </q-avatar>
            <span>Select date for travel</span>
          </div>
          <div class="labels">
            <q-input filled dense v-model="dateForm" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="selects-date">
          <div class="title-selects">
            <q-avatar color="orange" text-color="white" size="32px"> 2 </q-avatar>
            <span>Select travel's price</span>
          </div>
          <q-input filled dense v-model="priceForm" label="price" mask="number" :rules="['date']" />
        </div>
      </section>
    </q-step>

    <q-step :name="3" prefix="3" title="Create an ad">
      Try out different ad text to see what brings in the most customers, and learn how to enhance
      your ads using features like ad extensions. If you run into any problems with your ads, find
      out how to tell if they're running and how to resolve approval issues.
    </q-step>

    <template v-slot:navigation>
      <q-carousel
        v-if="step > 2"
        arrows
        animated
        v-model="slide"
        class="carrusel"
        control-type="unelevated"
      >
        <q-carousel-slide
          v-for="place in props.places"
          :key="place.place_id"
          :name="place.place"
          :img-src="place.image"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">{{ name }}</div>
            <div class="text-subtitle1">{{ place.place }}</div>
          </div>
          <section class="gadgets">
            <q-avatar color="primary" text-color="white" size="50px" class="avatar">
              <img v-if="auth.avatar" :src="auth.avatar" />
              <span v-else>{{ auth.username?.charAt(0) }}</span>
            </q-avatar>
            <q-btn
              icon="add"
              flat
              class="edit plus"
              size="18px"
              v-if="!moreInfo[place]"
              @click="toggleMoreInfo(place)"
              ><q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>More info</strong>
              </q-tooltip></q-btn
            >
            <section class="actions" v-if="moreInfo[place]">
              <q-btn icon="mdi-cash-multiple" flat class="edit plus" size="15px"
                ><q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <strong>{{ price }} EUR</strong>
                </q-tooltip></q-btn
              >
              <q-btn flat icon="event" size="15px" class="cursor-pointer edit plus">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" readonly class="calendar">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
              <q-btn flat class="edit plus" icon="edit" @click="editTravel(travel_id)" />
              <section class="delete">
                <q-btn
                  icon="delete"
                  @click="deleteTravel(travel_id)"
                  class="edit plus"
                  flat
                ></q-btn>
              </section>
              <q-btn
                flat
                class="edit plus"
                icon="mdi-arrow-u-left-top"
                @click="toggleMoreInfo(place)"
              />
            </section>
          </section>
        </q-carousel-slide>
      </q-carousel>
      <q-stepper-navigation>
        <q-btn
          @click="$refs.stepper.next()"
          color="deep-orange"
          :label="step === 3 ? 'Finish' : 'Continue'"
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

//data
const router = useRouter()
const props = defineProps({
  name: String,
  days: [String, Number],
  places: {
    type: Array,
    default: () => [
      {
        place: 'Country',
        image:
          'https://travelsvlh.s3.eu-north-1.amazonaws.com/calpe-top-10-lugares-que-ver-pe%C3%B1on-de-ifach-hero-2___responsive_865_320.jpg',
      },
    ],
  },
  price: [String, Number],
  travel_date: [String, Number],
  crud: Boolean,
  id: Number,
  user: String,
  travel_id: Number,
})
const auth = useUserStore()
const slide = ref(props.places[0].place)
const date = { from: '2020/07/08', to: '2020/07/17' }
const moreInfo = ref({})
const step = ref(1)
const numberPlaces = ref(1)
const country = ref('')
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const options = ref()
const dateForm = ref(null)
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
const toggleMoreInfo = (place) => {
  moreInfo.value[place] = !moreInfo.value[place]
}
const emits = defineEmits(['delete'])
const editTravel = (id) => {
  router.push({ name: 'edit', params: { id } })
}
const deleteTravel = (id) => {
  emits('delete', id)
}
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 450 ? (mobilView.value = true) : (mobilView.value = false)
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
//hooks
onMounted(() => {
  mobilView.value = window.innerWidth < 450
  window.addEventListener('resize', updateWidth)
})
</script>

<style lang="scss" scoped>
.settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 1rem;
}
.selects {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  place-items: center;
}
.selects-date {
 display: grid;
  grid-template-rows: 1fr 1fr;
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
  height: auto;
  aspect-ratio: 2/1;
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
  height: 1005;
  width: 100%;
  background-color: rgba(24, 24, 24, 0.831);
}
.calendar {
  width: 190px;
}
.carrusel :deep(.q-carousel__arrow) {
  background: rgba(0, 0, 0, 0.7) !important;
  color: #fff !important;
  border-radius: 50%;
  place-self: center;
}
.carrusel :deep(.q-carousel__arrow:hover) {
  background: rgba(0, 0, 0, 0.364) !important;
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
    gap: 3rem;
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
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: 1rem;
    place-items: start;
    align-items: center;
    width: 100%;
  }
}
</style>
