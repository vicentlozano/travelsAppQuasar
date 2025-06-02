<template>
  <div class="my-requests">
    <section class="friends-request" ref="requestContainerValue">
      <div class="request" v-for="request in props.cardObjects" :key="request.id">
        <div class="image-container">
          <img
            v-if="request.avatar && request.avatar !== 'undefined'"
            :src="request.avatar"
            class="image-contact"
          />
          <p v-else class="initial">
            {{ request.name.charAt(0).toUpperCase() + request.lastname.charAt(0).toUpperCase() }}
          </p>
        </div>
        <div class="info">
          <span class="name">{{ request.name }} {{ request.lastname }} </span>
          <span class="minor-info">14 travels </span>
        </div>
        <section class="actions">
          <q-btn
            dense
            :label="discover ? 'send friend request' : 'confirm'"
            unelevated
            size="14px"
            color="primary"
            class="action-btn"
            @click="!discover ? setRequest(request.id, true) : sendRequestById(request.id)"
          ></q-btn>
          <q-btn
            v-if="!discover"
            dense
            label="delete"
            size="14px"
            color="grey"
            text-color="black"
            class="action-btn"
            @click="setRequest(request.id, false)"
          ></q-btn>
        </section>
      </div>
      <div v-if="discover" class="view-more">
        <span class="discover-span">More people</span>
        <q-btn
          class="discover-btn"
          color="blue"
          size="40px"
          icon="add"
          @click="emits('more-people')"
        />
      </div>
      <transition name="fade">
        <q-btn
          v-show="showLeftArrow"
          flat
          icon="chevron_left"
          color="black"
          size="17px"
          class="position-left"
          @click="scrollLeft"
        />
      </transition>
      <transition name="fade">
        <q-btn
          v-show="showRightArrow"
          flat
          icon="chevron_right"
          color="black"
          size="17px"
          class="position-right"
          @click="scrollRight"
        />
      </transition>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick, watch } from 'vue'
import { setRequestById, sendRequest } from 'src/utils/api'
import { useUserStore } from 'src/stores/user'
import { notifyError, notifySuccess } from 'src/utils/utilsNotify'

//data
const user = useUserStore()
const requestContainerValue = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)
const props = defineProps({
  cardObjects: Array,
  discover: Boolean,
})
const emits = defineEmits(['more-people', 'filter-requests', 'load-contacts'])
//computed
watch(
  () => props.cardObjects,
  async () => {
    await nextTick()
    checkScrollPosition()
  },
  { immediate: true }, // també s'executa a la primera càrrega
)
//methods
const scrollRight = () => {
  if (requestContainerValue.value) {
    requestContainerValue.value.scrollBy({
      left: 270, // Quantitat de píxels a desplaçar cap a la dreta
      behavior: 'smooth',
    })
  }
}

const scrollLeft = () => {
  if (requestContainerValue.value) {
    requestContainerValue.value.scrollBy({
      left: -270, // Quantitat de píxels a desplaçar cap a la esquerra
      behavior: 'smooth',
    })
  }
}
const checkScrollPosition = () => {
  const el = requestContainerValue.value
  if (el) {
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const buffer = 20 // marge de tolerància en píxels
    showLeftArrow.value = el.scrollLeft > buffer
    showRightArrow.value = el.scrollLeft < maxScrollLeft - buffer
  }
}
const setRequest = async (contact, result) => {
  try {
    const response = await setRequestById({
      userId: user.userId,
      contactId: contact,
      status: result,
    })
    if (!response.data.error?.status) {
      emits('filter-requests', contact)
      if (result === false) {
        emits('load-contacts')
      }
    }
  } catch (error) {
    notifyError('errorSendMessage', error)
  }
}
const sendRequestById = async (idContact) => {
  try {
    const response = await sendRequest({
      userId: user.userId,
      contactId: idContact,
    })
    if (!response.data.error?.status) {
      notifySuccess('request sended!')
    }
  } catch (error) {
    notifyError('errorSendMessage', error)
  }
}
//hooks
onMounted(async () => {
  requestContainerValue.value?.addEventListener('scroll', checkScrollPosition, { passive: true })
  window.addEventListener('resize', checkScrollPosition)

  // Comprova posició inicial
  checkScrollPosition()
})
onUnmounted(() => {
  requestContainerValue.value?.removeEventListener('scroll', checkScrollPosition)
  window.removeEventListener('resize', checkScrollPosition)
})
</script>

<style lang="scss" scoped>
.my-requests {
  position: relative;
  display: grid;
  grid-template-rows: 220px;
  grid-template-rows: min-content 1fr;
}
.friends-request {
  display: flex;
  justify-content: start;
  overflow-x: auto;
  align-content: center;
  width: 100%;
  justify-self: center;
  margin: 1rem 1rem;
  padding: 0rem 0.6rem;
  gap: 01rem;
  justify-items: center;
  background-color: white;
  height: fit-content;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.request {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 240.8px 1fr 1fr;
  height: 430px;
  width: 100%;
  min-width: 250px;
  max-width: 300px;
  align-items: center;
  justify-items: center;
  gap: 0.1rem;
  border: 1px solid rgb(209, 205, 205);
  border-radius: 13px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
}
.view-more {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  max-height: 430px;
  min-height: 350px;
  min-width: 250px;
  width: 100%;
  max-width: 300px;
  align-items: center;
  justify-items: center;
  gap: 0.1rem;
  border: 1px solid rgb(209, 205, 205);
  border-radius: 13px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
}

.discover-span {
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;
  color: black;
  border-bottom: 2px solid rgb(0, 106, 255);
}
.discover-btn {
  border-radius: 50%;
}
.title {
  display: flex;
  justify-content: start;
  padding: 2rem 1rem 0rem 2rem;
  align-items: center;
  text-align: left;
  justify-self: center;

  width: 100%;
  font-weight: bold;
  color: rgb(25, 25, 26);
}
.image-container {
  width: 100%;
  height: 240.8px;
}

.name {
  font-weight: bolder;
  font-size: 1.4em;
}
.actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 0.5rem;
}
.action-btn {
  width: 100%;
}
.image-contact {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info {
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  padding: 1rem 1rem 0rem 1rem;
}
.position-left {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  padding: 0.5rem;
  background-color: rgb(208, 195, 195);
  border-radius: 50%;
}
.position-right {
  position: absolute;
  right: 0.5rem;
  padding: 0.5rem;
  top: 50%;
  background-color: rgb(208, 195, 195);
  border-radius: 50%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 450px) {
  .request {
    grid-template-rows: 200px min-content 1fr;
    height: 350px;
    width: 100%;
    min-width: 200px;
    max-width: 200px;
  }
  .info {
    padding: 0.2rem 0rem 0rem 0.4rem;
  }
  .actions {
    padding: 0.4rem;
  }
  .view-more {
    height: 350px;
    width: 100%;
    min-width: 200px;
    max-width: 200px;
  }
  .image-container {
    width: 100%;
    height: 200px;
  }
}
</style>
