<template>
  <div class="bar">
    <div class="q-pa-md slider" style="height: fit-content">
      <q-avatar
        v-for="contact in contacts"
        :key="contact.id"
        size="40px"
        @click="emits('recipienSelected', contact)"
        class="avatar"
      >
        <img v-if="contact.avatar" :src="contact.avatar" />
        <p v-else class="initial">
          {{
            contactChat.name.charAt(0).toUpperCase() + contactChat.lastname.charAt(0).toUpperCase()
          }}
        </p>
      </q-avatar>
    </div>
    <q-separator :vertical="!mobilView" />
  </div>
</template>

<script setup>
import { notifyError } from 'src/utils/utilsNotify'
import { ref, onMounted } from 'vue'
import { getContactsById } from '../../utils/api'

//props&emits
const props = defineProps({
  userId: {
    type: Number,
  },
})
const emits = defineEmits(['recipientSelected'])
//data
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const contacts = ref(null)

//methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 450 ? (mobilView.value = true) : (mobilView.value = false)
}
//hooks
onMounted(async () => {
  mobilView.value = window.innerWidth < 450
  window.addEventListener('resize', updateWidth)
  try {
    const response = await getContactsById({ userId: props.userId })
    if (!response.data.error.status) {
      contacts.value = response.data.data
      emits('recipientSelected', contacts.value[0])
    }
  } catch (error) {
    notifyError(error)
  }
})
</script>

<style lang="scss" scoped>
.slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 1rem;
}
.bar {
  display: grid;
  grid-template-columns: 1fr min-content;
  width: 100%;
}
.initial {
  margin: 0;
  font-weight: 400;
}
.avatar:hover {
  cursor: pointer;
}
@media (max-width: 450px) {
  .bar {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
} 
}
</style>
