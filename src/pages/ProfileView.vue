<template>
  <HeaderComponent class="fixed-header" />
  <div class="page-basic">
    <div class="tabs">
      <q-btn
        flat
        dense
        color="white"
        class="tab-buttons"
        label="profile"
        @click="tabName = 'profile'"
      ></q-btn>
      <q-btn
        flat
        dense
        color="orange"
        class="tab-buttons"
        label="contacts"
        @click="tabName = 'contacts'"
      ></q-btn>

      <q-btn
        flat
        dense
        color="blue"
        class="tab-buttons"
        label="social"
        @click="tabName = 'social'"
      ></q-btn>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="currentTabComponent" :key="tabName" />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import ProfileData from 'src/components/ProfileData.vue'
import ContactsList from 'src/components/ContactsList.vue'
import SocialComponent from 'src/components/SocialComponent.vue'

//data
const tabName = ref('profile')

//computed
const currentTabComponent = computed(() => {
  switch (tabName.value) {
    case 'profile':
      return ProfileData
    case 'contacts':
      return ContactsList
    case 'social':
      return SocialComponent
    default:
      return ProfileData
  }
})
//hooks
onMounted(async () => {})
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  height: 100%;
  padding-top: 3.6rem;
  width: 100%;
  grid-template-rows: min-content 1fr;
}

.tabs {
  display: grid;
  position: fixed;
  top: 3.6rem;
  width: 100%;
  z-index: 1;
  grid-template-columns: 1fr 1fr 1fr;
  backdrop-filter: blur(12px);
  justify-content: center;
  border-top: 2px solid white;
  background-color: rgba(27, 30, 37, 0.767);
  height: 3.6rem;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fixed-header {
  position: fixed;
}
@media (max-width: 450px) {
  .page-basic {
    padding-top: 0rem;
    padding-bottom: 3.4rem;
    grid-template-rows: min-content 1fr auto;
  }
  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid rgba(17, 62, 9, 0.667);
    top: 0;
  }
}
</style>
