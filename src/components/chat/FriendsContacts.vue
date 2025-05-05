<template>
  <div class="bar">
    <div class="q-pa-md slider" style="height: 80px">
      <q-avatar
        v-for="contact in contacts"
        :key="contact.id"
        size="40px"
        class="overlapping"
        @click="emits('recipienSelected', contact)"
      >
        <img v-if="contact.avatar" :src="contact.avatar" />
        <p v-else class="initial">{{ name.charAt(0).toUpperCase() }}</p>
      </q-avatar>
    </div>
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

const contacts = ref(null)

//hooks
onMounted(async () => {
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
.overlapping {
  border: 2px solid white;
}
.slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 1rem;
}
.bar {
  display: grid;
  grid-template-columns: fit-content 2fr;
  width: 100%;
  gap: 1rem;
}
.initial {
  margin: 0;
  font-weight: 400;
}
</style>
