<template>
  <div class="login-page">
    <transition name="fade" mode="out-in">
      <LoginCard />
    </transition>
  </div>
</template>
<script setup>
import LoginCard from 'src/components/LoginCard.vue'
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
  animation: gradient 10s ease infinite;
}
</style>
