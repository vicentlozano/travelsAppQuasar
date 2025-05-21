<template>
  <div class="social">
    <section v-if="requests" class="my-requests">
      <h5 class="title">Friends Request</h5>
      <section class="friends-request">
        <div class="request" v-for="request in requests" :key="request.id">
          <div class="image-container">
            <img v-if="request.avatar" :src="request.avatar" class="image-contact" />
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
              label="confirm"
              unelevated
              size="14px"
              color="primary"
              class="action-btn"
              @click="setRequest(request.id, true)"
            ></q-btn>
            <q-btn
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
      </section>
    </section>
    <section v-if="requests" class="my-requests">
      <h5 class="title">Discover people</h5>
      <section class="friends-request">
        <div class="request" v-for="request in requests" :key="request.id">
          <div class="image-container">
            <img v-if="request.avatar" :src="request.avatar" class="image-contact" />
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
              label="confirm"
              unelevated
              size="14px"
              color="primary"
              class="action-btn"
              @click="setRequest(request.id, true)"
            ></q-btn>
            <q-btn
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
      </section>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getRequestsById, setRequestById } from 'src/utils/api'
import { useUserStore } from 'src/stores/user'
import { notifyError } from 'src/utils/utilsNotify'

//data
const user = useUserStore()

const requests = ref(null)
//methods

const setRequest = async (contact, result) => {
  try {
    const response = await setRequestById({
      userId: user.userId,
      contactId: contact,
      status: result,
    })
    if (!response.data.error?.status) {
      requests.value = requests.value.filter((request) => request.id !== contact)
    }
  } catch (error) {
    notifyError('errorSendMessage', error)
  }
}
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
  justify-content: start;
  align-content: center;
  justify-self: center;
  padding-top: 3.6rem;
  max-width: 1400px;
}
.my-requests {
  position: relative;
  display: grid;
  grid-template-rows: 220px;
  grid-template-rows: min-content 1fr;
}
.friends-request {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  justify-content: start;
  align-content: center;
  width: 100%;
  padding: 1rem 2rem 2rem 2rem;
  gap: 01rem;
  justify-items: center;
  height: fit-content;
}

.request {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr min-content 2fr;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-items: center;
  gap: 0.1rem;
  border: 1px solid rgb(209, 205, 205);
  border-radius: 13px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.title {
  display: flex;
  justify-content: start;
  padding: 2rem 1rem 0rem 2rem;
  align-items: center;
  text-align: left;
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
@media (max-width: 450px) {
  .social {
    padding-top: 4rem;
    padding-bottom: 3.4rem;
  }
}
</style>
