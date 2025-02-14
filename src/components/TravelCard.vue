<template>
  <div class="principal">
    <div class="card">
      <section class="parallax" :style="{ backgroundImage: `url(${backgroundImage})` }"></section>
      <section class="text">
        <h3>{{ name }}</h3>
        <p><span class="info">Dias:</span>{{ props.days }}</p>
        <p>
          <span class="info">Sitios visitados:</span>
          <span v-for="(place, index) in places" :key="place">
            {{ place }}<span v-if="index < places.length - 1">, </span>
          </span>
        </p>
        <p><span class="info">Precio:</span>{{ price }}€</p>
        <p><span class="info">Año:</span>{{ year }}</p>
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
  days: [String,Number],
  places: Array,
  price:  [String,Number],
  backgroundImage: String,
  year: [String,Number],
  crud: Boolean,
  id: String,
})
const emits = defineEmits(['delete'])
const editTravel = (id) => {
  router.push({ name: 'edit', params: { id } })
}
const deleteTravel = (id) => {
  emits('delete', id)
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  background-color: rgb(56, 54, 54);
  border-radius: 25px;
}
.principal {
  display: grid;
  grid-template-rows: 5fr auto;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.parallax {
  min-height: 400px;
  min-width: 400px;
  background-image: url(../assets/landsphoto.jfif);
  background-position: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
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

.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  text-align: justify;
  width: 100%;
  height: 100%;
}
h3 {
  color: white;
  font-size: 1.4em;
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
@media(max-width:450px){

  .parallax {
  min-height: 200px;
  min-width: 200px;

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
  width: 200px;
  height: 100%;
  
}
}
</style>
