<template>
  <div v-if="verified">Email Verificado!</div>
  <div v-else>Got an Error!</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { verifyEmail } from 'src/utils/api'
const props = defineProps({
  token: String,
})

onMounted(async () => {
  try {
    const response = await verifyEmail(props.token)
    if (response) {
      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<style lang="scss" scoped></style>
