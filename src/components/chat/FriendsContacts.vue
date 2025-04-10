<template>
  <div class="bar">
    <div class="q-pa-md  slider" style="height: 80px">
      <q-avatar
        v-for="n in 15"
        :key="n"
        size="40px"
        class="overlapping"
      >
        <img :src="`https://cdn.quasar.dev/img/avatar${1 + 1}.jpg`" />
      </q-avatar>
    </div>
    <q-input v-model="search" debounce="500" filled placeholder="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.overlapping {
  border: 2px solid white;
}
.slider{
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap:1rem;
}
.bar {
  display: grid;
  grid-template-columns: fit-content 2fr;
  width: 100%;
  gap: 1rem;
}
</style>
