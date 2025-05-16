<template>
  <q-dialog
    v-model="isShow"
    @hide="emits('close-dialog', false)"
    backdrop-filter="blur(5px) saturate(150%)"
  >
    <div class="image-dialog">
      <div class="avatar">
        <q-avatar size="10rem" class="avatar-container">
          <img v-if="auth.avatar" :src="imageUrl" class="avatar-image" />
          <span v-else>{{ auth.username?.charAt(0) }}</span>
        </q-avatar>
        <q-file
          v-model="imageFile"
          filled
          dense
          name="avatar"
          label-color="black"
          label="Add your photo"
          @update:model-value="onFileChange"
        >
          <template v-slot:append>
            <q-icon
              v-if="imageFile !== null"
              name="close"
              @click.stop.prevent="((imageFile = null), (imageUrl = auth.avatar))"
              class="cursor-pointer"
            />
            <q-icon v-if="imageFile === null" round dense flat name="cloud_upload" />
          </template>
        </q-file>
      </div>
      <q-card-actions align="center" class="buttons">
        <q-btn
          outline
          color="primary"
          class="button"
          label="Cancel"
          @click="emits('close-dialog', false)"
          v-close-popup
        />
        <q-btn outline color="primary" label="OK" @click="onOKClick" class="button" />
      </q-card-actions>
    </div>
  </q-dialog>
</template>

<script setup>
import { notifyErrorCenter, notifySuccessCenter } from 'src/utils/utilsNotify'
import { useUserStore } from '../stores/user'
import { ref, watch } from 'vue'
import { changeAvatar } from 'src/utils/api'

// props && emits
const emits = defineEmits(['close-dialog'])
const props = defineProps({
  show: Boolean,
})
const isShow = ref(false)
const auth = useUserStore()
const imageFile = ref(null)
const imageUrl = ref(auth.avatar || '')

//watch
watch(
  () => props.show,
  (newValue) => {
    isShow.value = newValue
    // Lógica adicional aquí
  },
)

//methods
const onOKClick = async () => {
  try {
    const formData = new FormData()
    formData.append('avatar', imageFile.value)
    formData.append('userId', auth.userId)

    const response = await changeAvatar(formData)
    if (!response.data.error.status) {
      notifySuccessCenter('Cambio realizado!')
      auth.updateUserAvatar(response.data.newAvatar)
      emits('close-dialog', false)
    } else {
      notifyErrorCenter('Error en el registro')
    }
  } catch (error) {
    console.log(error)
  }
}
const onFileChange = () => {
  imageUrl.value = URL.createObjectURL(imageFile.value)
}
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
  justify-items: center;
  align-content: center;
  gap: 1rem;
  background-color: transparent;
}
.buttons {
  display: flex;
  justify-items: space-around;
  place-items: center;
  width: 100%;
  gap: 1rem;
}
.button {
  width: 90px;
  border-radius: 30px;
  padding: 0rem 0rem;
  margin: 0;
}
.avatar-container {
  font-size: '52px';
  place-items: center;
  color: 'white';
  background-color: 'teal';
  overflow: hidden;
  box-shadow: 0 0 12px 4px rgba(40, 142, 167, 0.6);
  border-radius: 50%;
}
.avatar-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}


@media (max-width: 600px) {
  .image-dialog {
    display: grid;
    grid-template-rows: 1fr min-content;
    border-radius: 20px;
    place-items: center;
    height: fit-content;
    padding: 1rem;
    gap: 1rem;
    width: 90%;
    background-color: white;
  }
}
</style>
