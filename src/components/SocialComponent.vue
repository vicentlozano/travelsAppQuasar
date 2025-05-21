<template>
  <div class="social">
    <section v-if="requests" class="my-requests">
      <h5 class="title">Friends Request</h5>
      <section class="friends-request">
        <div class="request" v-for="request in requests" :key="request.id">
          <q-avatar size="110px" class="avatar selected">
            <img v-if="request.avatar" :src="request.avatar" />
            <p v-else class="initial">
              {{ request.name.charAt(0).toUpperCase() + request.lastname.charAt(0).toUpperCase() }}
            </p>
          </q-avatar>
          <span class="name">{{ request.name }} {{ request.lastname }} </span>
          <section class="actions">
            <q-btn
              flat
              dense
              round
              icon="close"
              size="14px"
              color="red"
              @click="setRequest(request.id, false)"
            ></q-btn>
            <q-btn
              flat
              dense
              round
              icon="check_circle"
              size="14px"
              color="green"
              @click="setRequest(request.id, true)"
            ></q-btn>
          </section>
        </div>
      </section>
    </section>
    <section v-if="requests" class="my-requests">
      <h5 class="title">Discover People</h5>
      <section class="friends-request">
        <div class="request" v-for="request in requests" :key="request.id">
          <q-avatar size="60px" class="avatar selected">
            <img v-if="request.avatar" :src="request.avatar" />
            <p v-else class="initial">
              {{ request.name.charAt(0).toUpperCase() + request.lastname.charAt(0).toUpperCase() }}
            </p>
          </q-avatar>
          <span class="name">{{ request.name }} {{ request.lastname }} </span>
          <section class="actions">
            <q-btn
              flat
              dense
              round
              icon="close"
              size="14px"
              color="red"
              @click="setRequest(request.id, false)"
            ></q-btn>
            <q-btn
              flat
              dense
              round
              icon="check_circle"
              size="14px"
              color="green"
              @click="setRequest(request.id, true)"
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
  display: grid;
  height: 100%;
  width: 100%;
  padding-top: 7.4rem;
}
.my-requests {
  position: relative;
  display: grid;
  grid-template-rows: 220px;
  grid-template-rows: min-content 1fr;
}
.friends-request {
   display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  justify-content: start;
  align-content: center;
  width: 100%;
  padding: 2rem;
  gap:0.2rem;
  justify-items: center;
  height: fit-content;
  padding-top: 5rem;
}

.request {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1fr 1fr;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-items: center;
  gap: 0.1rem;
  padding: 1rem;
  color: rgb(234, 225, 225);
  background-color:rgb(49, 49, 48);;
  border-radius: 13px;
}
.title {
  display: flex;
  justify-content: start;
  padding: 1rem 1rem 0rem 1rem;
  align-items: center;
  text-align: left;
  color: rgb(179, 184, 189);
}
.selected {
  box-shadow: 0 0 12px 4px rgba(40, 137, 167, 0.925);
  border-radius: 50%;
}
.name{
  font-weight: bolder;
  font-size: 1.4em;
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
