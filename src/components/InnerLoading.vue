<template>
  <q-card class="relative-position full" flat bordered>
    <q-card-section class="full">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="full" v-show="showSimulatedReturnData">
          <slot />
        </div>
      </transition>
    </q-card-section>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
//data
const visible = ref(false)
const showSimulatedReturnData = ref(false)
//hooks

onMounted(() => {
  visible.value = true
  showSimulatedReturnData.value = false
  setTimeout(() => {
    visible.value = false
    showSimulatedReturnData.value = true
  }, 1000)
})
</script>

<style lang="scss" scoped>
.full {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  height: 100%;
  width: 100%;
}
</style>
