<template>
  <header :class="mobilView ? 'nav-footer' : 'nav-header'">
    <RouterLink class="link" to="/"
      ><q-icon name="mdi-home" class="icons-header" /></RouterLink
    >
    <RouterLink class="link" to="/chat">
      <q-icon
        name="mdi-chat"
        class="icons-header"
        :color="auth.countMessages > 0 ? 'red' : 'white'"
      />
    </RouterLink>
    <RouterLink class="link" to="/media"
      ><q-icon name="mdi-airplane" class="icons-header" /></RouterLink
    >
    <RouterLink class="link" to="/search"
      ><q-icon name="mdi-magnify" class="icons-header" /></RouterLink
    >
    <RouterLink class="link" to="/profile"
      ><q-avatar size="30px"><img :src="auth.avatar" /> </q-avatar
      ></RouterLink
    >
  </header>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const mqtt = inject('appGlobal/mqtt')
const alertChat = ref(false)

//methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 450 ? (mobilView.value = true) : (mobilView.value = false)
}

//computed

//hooks
onMounted(() => {
  mobilView.value = window.innerWidth < 450
  window.addEventListener('resize', updateWidth)
  if (auth.mqttAlertSubscribe === false) {
    try {
      mqtt.subscribe(`TRAVELS/ALERTS/CHAT/${auth.userId}`, (haveNewMessage) => {
        let data = JSON.parse(haveNewMessage)
        alertChat.value = data.haveNewMessage
        auth.recountNewMessages(data.unreadMessages)
      })
      auth.subscribeAlert(true)
    } catch (err) {
      console.log(err)
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background-color: transparent;
}
.nav {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  gap: 2px;
}
.logged {
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
}

.link {
  color: white;
  text-decoration: none;
  width: 70%;
  height: fit-content;
  padding: 0.2rem;
  border-radius: 25px;
}

a {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s ease;
  font-size: 1.5em;
  font-weight: 700;
  gap: 0.3rem;
}
h1 {
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.custom-button {
  min-width: 150px;
  border-right: 2px solid rgba(255, 255, 255, 0.664);
}
.nav-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  border-top: 2px solid white;
  background-color: rgba(0, 0, 0, 0.77);
  backdrop-filter: blur(10px) saturate(10%);

  align-items: center;
  height: 3.6rem;
  padding: 0.3rem;
  z-index: 1;
  .link {
    margin: 0;
    width: fit-content;
  }
  .link-image {
    padding: 0rem;
  }
}
.nav-footer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  border-top: 2px solid white;
  background-color: rgba(0, 0, 0, 0.77);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 0.3rem;
  position: fixed;
  height: 3.6rem;
  z-index: 1;
  bottom: 0;
  .link {
    margin: 0;
    width: fit-content;
    padding: 0rem;
  }
  .link:hover {
    transform: scale(1);
    transition: none;
  }
}
.icons-header {
  height: 30px;
  width: 30px;
}
.title {
  font-family: 'Pacifico', cursive;
  font-style: italic;
  color: whitesmoke;
  font-weight: 300;
  font-size: 1em;
}
@media (min-width: 1070px) and (max-width: 1500px) {
  .link {
    padding: 0.2rem 1.5rem;
    width: 90%;
    gap: 0.1rem;
  }
}
@media (max-width: 1069px) {
  .link {
    padding: 0.2rem 1.5rem;
    width: 90%;
    gap: 0.1rem;
  }
  .logged {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    gap: 0.5rem;
    .title {
      grid-row: 1/2;
      grid-column: 1 / -1;
      height: fit-content;
    }
    .section-title {
      display: none;
    }
  }
}
@media (max-width: 600px) {
  a.link {
    padding: 0.2rem 1.5rem;
    width: 60%;
  }
}

@media (max-width: 600px) {
  .nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid white;
    gap: 2px;
  }
  h1 {
    grid-row: 1;
    grid-column: 1 / -1;
  }
  .link {
    margin-bottom: 0.4rem;
  }
}
</style>
