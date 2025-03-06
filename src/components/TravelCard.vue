<template>
  <div class="principal">
    <div class="card">
      <section class="travel-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <q-avatar size="70px" class="avatar">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
        <div>
          <h3 class="section-title">{{ name }}</h3>
        </div>
      </section>
      <section class="text">
        <p>
          <span class="info">{{ props.days }} Dias</span>
        </p>
        <p>
          <span v-for="(place, index) in places" :key="place" class="info"
            >{{ place }}<span v-if="index < places.length - 1">, </span>
          </span>
        </p>
        <p>
          <span class="info">{{ price }}€</span>
        </p>
        <p>
          <span class="info">{{ year }}</span>
        </p>

        <section v-if="props.crud" class="crud">
          <button class="round-button" @click="deleteTravel(props.id)">
            <img class="delete" alt="delete" src="../assets/icons/icons8-delete-60.png" />
          </button>
          <button class="round-button" @click="editTravel(props.id)">
            <img class="edit" alt="edit" src="../assets/icons/icons8-edit-50.png" />
          </button>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  name: String,
  days: [String, Number],
  places: Array,
  price: [String, Number],
  backgroundImage: String,
  year: [String, Number],
  crud: Boolean,
  id: String,
  user: String,
})
const emits = defineEmits(['delete'])
const editTravel = (id) => {
  console.log(id)
  router.push({ name: 'edit', params: { id } })
}
const deleteTravel = (id) => {
  emits('delete', id)
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 0.5fr;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  background-image: url(../assets/landsphoto.jfif);

  background: linear-gradient(90deg, rgba(12, 12, 12, 0.905) 40%, rgba(12, 12, 12, 0.757));
  border-radius: 25px;
}
.principal {
  display: grid;
  grid-template-rows: 5fr auto;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.travel-image {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  min-height: 280px;
  min-width: 400px;
  background-image: url(../assets/landsphoto.jfif);
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.crud {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  padding: 1rem;
  border-radius: 15px;
}
.round-button {
  height: auto;
  width: auto;
  border-radius: 50%;
  border: none;
  background-size: auto;
  background-color: transparent;
  cursor: pointer;
}
img {
  transition: transform 0.4s ease;
}
.delete {
  height: 50px;
  width: 50px;
}
.edit {
  height: 50px;
  width: 50px;
}
img:hover {
  transform: scale(1.1);
}
.section-title {
  background-color: rgba(32, 26, 26, 0.498);
  font-weight: 700;
}
.text {
  display: grid;
  grid-template-rows: auto auto auto auto;
  align-items: center;
  text-align: center;
  text-align: center;
  background-color: transparent;
  padding: 0rem 1rem;
  width: 100%;
  height: 100%;
  p {
    font-size: 1.2em;
    margin: 0;
    color: white;
    text-align: center;
  }
}

h3 {
  color: white;
  margin: 0;
  font-size: 1.4em;
  border-bottom-left-radius: 25px;
}
.info {
  color: white;
  margin-right: 0.6rem;
}
p {
  width: 100%;
  text-align: center;
  color: rgb(119, 186, 206);
}
.avatar {
  padding: 0.4rem;
}

@media (max-width: 1310px) {
  .travel-image {
    min-height: 200px;
    min-width: 300px;
    background-image: url(../assets/landsphoto.jfif);
    border-bottom-left-radius: 0px;
    border-top-right-radius: 25px;
  }
  .card {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
  h3 {
    border-bottom-left-radius: 0px;
  }
}
@media (max-width: 681px) {
  .travel-image {
    min-height: 200px;
    min-width: 400px;
    background-image: url(../assets/landsphoto.jfif);
    border-top-right-radius: 0px;
    border-bottom-left-radius: 25px;
  }
  .card {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1.6fr 1fr;
  }
  h3 {
    border-bottom-left-radius: 25px;
  }
}

@media (max-width: 450px) {
  .travel-image {
    min-height: 200px;
    min-width: 360px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 0px;
  }
  .card {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    width: 100%;
  }
  h3 {
    border-bottom-left-radius: 0px;
  }
  .delete {
    height: 30px;
    width: 30px;
  }
  .edit {
    height: 30px;
    width: 30px;
  }
  .card {
    height: 100%;
  }
}
</style>
