<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { verifyEmail } from 'src/utils/api'
import {  notifySuccessCenter } from 'src/utils/utilsNotify'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  token: String,
})

const message = ref('')

onMounted(async () => {
  console.log(props)
  try {
    let response = await verifyEmail({ token: props.token })
    response = response.data

    if (!response.error.status) {
      if (response.error.source) {
        notifySuccessCenter(response.error.source)
        message.value = response.error.source
        setTimeout(() => router.push({ name: 'login' }), 4000)
      } else {
        notifySuccessCenter('User Email is correctly!')
        setTimeout(() => router.push({ name: 'login' }), 4000)
      }
    }
  } catch (error) {
    console.log(error)
  router.push({ name: 'login' })

  }
})
</script>

<style lang="scss" scoped></style>
