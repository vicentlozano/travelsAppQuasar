<template>
  <div class="verify-page">
    <transition name="fade" mode="out-in">
      <Verify :token="token"/>
    </transition>
  </div>
</template>
<script setup>
import Verify from 'src/components/LoginCard.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

//data
const route = useRoute()
const token = ref(null)

onMounted(() => {
  token.value = route.query.token
})
</script>

<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.verify-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(-127deg, $blue-gray 50%, $gray-accent 67%);
  background-size: 800% 800%;
  animation: gradient 10s ease infinite;
}
</style>
