<template>
  <section class="login-page">
    <RegisterCard />
  </section>
</template>
<script setup>
import RegisterCard from '../components/SignUpCard.vue'

//data

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

.login-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-127deg, $blue-gray 50%, $gray-accent 67%);
  background-size: 800% 800%;
  animation: gradient 20s ease infinite;
}


</style>
