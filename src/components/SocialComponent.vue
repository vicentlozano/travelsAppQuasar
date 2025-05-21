<template>
  <div class="social">
    <section v-if="requests" class="my-requests">
      <h5 class="title">Friends Request</h5>

        <CardsSlider :discover="true" :cardObjects="requests" />
    </section>

    <section class="discover">
      <h5 class="title">Discover People</h5>

      <CardsSlider :discover="true" :cardObjects="requests" />
    </section>
    <section class="discover">
      <h5 class="title">Discover People</h5>

      <CardsSlider :discover="true" :cardObjects="requests" />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue'
import { getRequestsById } from 'src/utils/api'
import { useUserStore } from 'src/stores/user'
import { notifyError } from 'src/utils/utilsNotify'
import CardsSlider from './CardsSlider.vue'

//data
const user = useUserStore()
const requests = ref(null)
ref(false)

//methods



//hooks
onMounted(async () => {
  try {
    const response = await getRequestsById({
      userId: user.userId,
    })
    if (!response.data.error?.status) {
      requests.value = response.data.data

    }
  } catch (error) {
    notifyError('errorSendMessage', error)
  }
})

</script>

<style lang="scss" scoped>
.social {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-content: center;
  justify-self: center;
  padding-top: 3.6rem;
  max-width: 1400px;
}
.my-requests {
  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr;
}
.friends-request {
  display: flex;
  justify-content: start;
  overflow-x: auto;
  align-content: center;
  width: 100%;
  justify-self: center;
  padding: 1rem 2rem 2rem 2rem;
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
  grid-template-rows: 3fr min-content min-content;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
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
  height: 100%;
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
  .social {
    padding-top: 4rem;
    padding-bottom: 3.4rem;
  }

  .request {
    grid-template-rows: 2fr min-content min-content;
    height: 350px;
    width: 100%;
    min-width: 200px;
    max-width: 200px;
  }
}
</style>
