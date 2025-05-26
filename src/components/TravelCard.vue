<template>
  <q-carousel
    arrows
    swipeable
    animated
    v-model:fullscreen="fullscreen"
    v-model="slide"
    infinite
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
          push
          round
          dense
          style="height: fit-content; align-self: center"
          text-color="white"
          v-if="!moreInfo[place]"
          @click="toggleMoreInfo(place)"
          ><q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-blue">
            <strong>More info</strong>
          </q-tooltip></q-btn
        >
        <section class="actions" v-if="moreInfo[place]">
          <q-btn
            icon="mdi-cash-multiple"
            push
            round
            dense
            style="height: fit-content; align-self: center"
            text-color="white"
            ><q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-blue">
              <strong>{{ price }} EUR</strong>
            </q-tooltip></q-btn
          >
          <q-btn
            icon="event"
            push
            round
            dense
            style="height: fit-content; align-self: center"
            text-color="white"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-blue">
              <strong>More info</strong>
            </q-tooltip>
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date" readonly class="calendar">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          <q-btn
            v-if="crud"
            push
            round
            dense
            style="height: fit-content; align-self: center"
            text-color="white"
            icon="edit"
            @click="editTravel(travel_id)"
          />
          <section v-if="crud" class="delete">
            <q-btn
              icon="delete"
              @click="deleteTravel(travel_id)"
              push
              round
              dense
              style="height: fit-content; align-self: center"
              text-color="white"
            ></q-btn>
          </section>
          <q-btn
            push
            round
            dense
            style="height: fit-content; align-self: center"
            text-color="white"
            icon="mdi-arrow-u-left-top"
            @click="toggleMoreInfo(place)"
          />
        </section>
      </section>
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control position="bottom-right" :offset="[18, 18]">
        <q-btn
          push
          round
          dense
          text-color="white"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

//data
const router = useRouter()
const props = defineProps({
  name: String,
  places: [Object],
  price: [Number,String],
  travel_date: [String, Number,Object],
  crud: Boolean,
  id: Number,
  user: String,
  travel_id: Number,
})
const auth = useUserStore()
const slide = ref(props.places[0].place)
const date = { from: '2020/07/08', to: '2020/07/17' }
const fullscreen = ref(false)
const moreInfo = ref({})

// methods
const toggleMoreInfo = (place) => {
  moreInfo.value[place] = !moreInfo.value[place]
}
const emits = defineEmits(['delete'])
const editTravel = (id) => {
  console.log('hola', id)
  router.push({ name: 'edit', params: { id } })
}
const deleteTravel = (id) => {
  emits('delete', id)
}
</script>

<style lang="scss" scoped>
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
  height: 1005;
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
    min-height: 30vh;
  }
}
</style>
