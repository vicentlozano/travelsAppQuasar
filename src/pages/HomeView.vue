<template>
  <HeaderComponent class="fixed-header" />
  <div class="basic-container">
    <div class="paralax">
      <div class="land-title">Travels App</div>
      <div class="absolute-bottom custom-caption">
        <div :class="movil ? 'small-title' : 'text-h4'">Discover Travels</div>
        <div :class="movil ? 'small-subtitle1' : 'text-subtitle1'">Inspire people</div>
      </div>
    </div>
    <h2 v-if="friendsTravels.length > 0" class="title">Friends travels</h2>
    <section
      v-if="friendsTravels.length > 0"
      class="last-travels"
      :style="
        (peopleTravels.length > 0 || myTravels.length > 0) && $q.screen.width < 450
          ? 'padding-bottom:0'
          : ''
      "
    >
      <TravelCard
        v-for="travel in friendsTravels"
        :key="travel.travel_id"
        :name="travel.name"
        :places="travel.places"
        :price="travel.price"
        :travel_date="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="false"
        :travel_id="travel.travel_id"
      />
    </section>
    <h2 v-if="peopleTravels.length > 0" class="title">Last people travels</h2>
    <section
      v-if="peopleTravels.length > 0"
      class="last-travels"
      :style="myTravels.length > 0 && $q.screen.width < 450 ? 'padding-bottom:0' : ''"
    >
      <TravelCard
        v-for="travel in peopleTravels"
        :key="travel.travel_id"
        :name="travel.name"
        :places="travel.places"
        :price="travel.price"
        :travel_date="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="false"
        :travel_id="travel.travel_id"
      />
    </section>
    <h2 v-if="myTravels.length > 0" class="title">Your last travels</h2>
    <section v-if="myTravels.length > 0" class="last-travels">
      <TravelCard
        v-for="travel in myTravels"
        :key="travel.travel_id"
        :name="travel.name"
        :places="travel.places"
        :price="travel.price"
        :travel_date="travel.travel_date"
        :user="travel.user_name"
        :id="travel.user_id"
        :crud="false"
        :travel_id="travel.travel_id"
      />
      <section class="card">
        <h4 class="add-text">Añade nuevo contenido!</h4>
        <RouterLink class="link" to="/media"
          ><q-icon name="mdi-airplane" size="50px" class="icons-header"
        /></RouterLink>
      </section>
    </section>
    <section v-else class="no-travels">
      <h3 class="message-empty">Sin viajes actualmente!</h3>
    </section>
  </div>
</template>

<script setup>
import TravelCard from '../components/TravelCard.vue'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from 'src/stores/user'
import { getAllTravels, getFriendsTravels, getNewPeopleTravels } from '../utils/api/get.js'
import { useQuasar } from 'quasar'

import HeaderComponent from 'src/components/HeaderComponent.vue'
//data
const myTravels = ref([])
const peopleTravels = ref([])
const friendsTravels = ref([])
const auth = useUserStore()

const $q = useQuasar()

//computed
const movil = computed(() => $q.screen.width < 650)

onMounted(async () => {
  try {
    //
    let response = await getAllTravels()
    response = response.data
    myTravels.value = response.data.filter((travel) => travel.user_id === auth.userId)
    let totalTravels = myTravels.value.length

    if (totalTravels > 4) {
      myTravels.value = myTravels.value.slice(totalTravels - 3, totalTravels)
    }
    //
    let friendsResponse = await getFriendsTravels({ id: auth.userId })
    friendsResponse = friendsResponse.data
    const totalFriends = friendsResponse.data.length

    if (totalFriends > 4) {
      friendsTravels.value = friendsResponse.data.slice(totalFriends - 4, totalFriends)
    } else {
      friendsTravels.value = friendsResponse.data
    }
    //
    let peopleResponse = await getNewPeopleTravels({ id: auth.userId })
    peopleResponse = peopleResponse.data
    const totalPeople = peopleResponse.data.length

    if (totalPeople > 4) {
      peopleTravels.value = peopleResponse.data.slice(totalPeople - 4, totalPeople)
    } else {
      peopleTravels.value = peopleResponse.data
    }
  } catch (error) {
    console.log(error)
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

.basic-container {
  display: grid;
  grid-template-rows: fit-content 1fr;
  padding-top: 3.4rem;
  height: 100%;
  width: 100%;
}

.last-travels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: 0.1rem;

  justify-items: start;
  align-items: start;
  height: min-content;
  background-color: transparent;
}
.link {
  color: white;
  text-decoration: none;
  width: 70%;
  height: fit-content;
  padding: 0.2rem;
  border-radius: 25px;
}
.icons-header {
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 3.4rem;
  width: 100%;
  font-size: 2em;
  font-weight: 700;
  height: 5rem;
  background-color: rgb(44, 46, 46);
  color: white;
}
.no-travels {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background-color: transparent;
  height: 80vh;
  color: black;
}
.no-travels h3 {
  font-weight: 500;
}

.absolute-top {
  position: fixed;
  top: 1;
  background-color: $gray-accent;
  height: 3.4rem;
}
.fixed-header {
  position: fixed;
}
.title {
  font-family: 'Pacifico', cursive;
  font-weight: 200;
  padding: 0.2rem;
  font-style: italic;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 1.4em;
}
.paralax {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../assets/boat.jpg');
  background-attachment: fixed;
  background-position: center;
  background-color: $primary-color;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: calc(100vh - 3.4rem);
  background-position-x: center;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.absolute-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.land-title {
  position: absolute;
  bottom: 40%;
  width: 100%;
  font-size: 10em;
  letter-spacing: 0.3em;
  color: rgb(187, 211, 218);
  text-align: center;
}
.small-title {
  font-size: 1.6em;
}
.small-subtitle {
  font-size: 0.6em;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 350px;
  padding: 5rem;
  gap: 1rem;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(90deg, rgba(12, 12, 12, 0.905) 70%, rgba(12, 12, 12, 0.757));
}
@media (min-width: 450px) and (max-width: 1310px) {
  .last-travels {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
  .land-title {
    font-size: 7em;
  }
}

@media (max-width: 450px) {
  .basic-container {
    padding-top: 0rem;
  }
  .land-title {
    font-size: 4em;
  }
  .last-travels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-bottom: 3.4rem;
  }
  .page-basic {
    padding-top: 0rem;
  }
  .card {
    height: 30vh;
  }
  .no-travels {
    padding: 7.4rem 0.2rem 3.6rem 0.2rem;
  }
  .center {
    font-size: 1.5em;
  }
}
</style>
