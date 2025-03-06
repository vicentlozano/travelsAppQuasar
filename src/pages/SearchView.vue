<template>
   <q-input v-model="search" debounce="500" filled placeholder="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
</template>

<script setup></script>

<style lang="scss" scoped></style>
