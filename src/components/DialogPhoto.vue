<template>
  <q-dialog
    v-model="isShow"
    @hide="emits('close-dialog', false)"
    backdrop-filter="blur(5px) saturate(150%)"
  >
    <div class="image-dialog">
      <div class="avatar">
        <q-avatar size="149.60px" font-size="52px" text-color="white" color="teal">
          <img v-if="auth.avatar" :src="imageScr" />
          <span v-else>{{ auth.username.charAt(0) }}</span>
        </q-avatar>
        <q-file
          v-model="imageFile"
          filled
          dense
          name="avatar"
          label-color="white"
          label="Add your photo"
          @update:model-value="onFileChange"
        >
          <template v-slot:append>
            <q-icon
              v-if="imageFile !== null"
              name="close"
              @click.stop.prevent="((imageFile = null), (imageUrl = null))"
              class="cursor-pointer"
            />
            <q-icon v-if="imageFile === null" round dense flat name="cloud_upload" />
          </template>
        </q-file>
      </div>
      <q-card-actions align="center" class="buttons">
        <q-btn color="primary" label="OK" @click="onOKClick" class="button" />
        <q-btn
          color="primary"
          class="button"
          label="Cancel"
          @click="emits('close-dialog', false)"
          v-close-popup
        />
      </q-card-actions>
    </div>
  </q-dialog>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { ref, watch } from 'vue'

// props && emits
const emits = defineEmits(['close-dialog'])
const props = defineProps({
  show: Boolean,
})
const isShow = ref(false)
const auth = useUserStore()
const imageScr = ref(auth.avatar || '')

//watch
watch(
  () => props.show,
  (newValue) => {
    isShow.value = newValue
    // Lógica adicional aquí
  },
)

//methods
const onOKClick = () => {}
</script>

<style lang="scss" scoped>
.image-dialog {
  display: grid;
  grid-template-rows: 1fr min-content;
  border-radius: 20px;
  place-items: center;
  height: fit-content;
  padding: 1rem;
  gap: 1rem;
  width: 40%;
  background-color: white;
}
.avatar {
  display: grid;
  grid-template-rows: min-content min-content;
  gap: 1rem;
  place-items: center;
  background-color: white;
}
.buttons {
  display: grid;
  justify-items: space-around;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 5rem;
}
.button {
  width: 100%;
  border-radius: 30px;
  padding: 0rem 2rem;
}
</style>
