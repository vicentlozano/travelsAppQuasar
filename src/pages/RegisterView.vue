<template>
    <div class="login-page">
      <div class="fallout">
        <transition name="fade" mode="out-in">
            <SignUpCard :signup="true"/>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import SignUpCard from 'src/components/SignUpCard.vue';
  </script>
  
  <style lang="scss" scoped>
  
  .login-page {
    display: grid;
    grid-template-rows: auto;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-image: url('../assets/boat.jpg');
    background-image: url('../assets/boat.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
  }
  .fallout{
    display: grid;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.466);
    backdrop-filter: blur(5px);
    }
  </style>
  