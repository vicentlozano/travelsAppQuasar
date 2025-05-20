<template>
  <div class="contacts-panel" v-if="contacts.length">
    <q-input
      v-if="displayedContacts"
      v-model="search"
      debounce="500"
      filled
      placeholder="Search"
      :class="isScrolled ? 'scrolled search-input' : 'search-input'"
      bg-accent
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="contacts">
      <section class="my-contacts" v-for="contact in displayedContacts" :key="contact.id">
        <q-avatar size="60px" class="avatar selected">
          <img v-if="contact.avatar" :src="contact.avatar" />
          <p v-else class="initial">
            {{ contact.name.charAt(0).toUpperCase() + contact.lastname.charAt(0).toUpperCase() }}
          </p>
        </q-avatar>
        <span class="name">{{ contact.name }} {{ contact.lastname }} </span>
        <section class="actions">
          <q-btn
            flat
            dense
            round
            icon="message"
            size="14px"
            color="blue"
            @click="sendMessage(contact.id)"
          ></q-btn>
          <q-btn
            flat
            dense
            round
            icon="close"
            size="14px"
            color="red"
            @click="deleteContact(contact.id)"
          ></q-btn>
        </section>
      </section>
    </div>
  </div>
  <InnerLoading v-else>
    <h3 class="message">No contacts yet!</h3>
  </InnerLoading>
</template>

<script setup>
import { useUserStore } from '../stores/user'
// import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { getContactsById } from 'src/utils/api'
import { notifyError, notifySuccess } from 'src/utils/utilsNotify'
import { useRouter } from 'vue-router'
import { deleteContactById } from 'src/utils/api'
import InnerLoading from './InnerLoading.vue'

//data
const auth = useUserStore()
const router = useRouter()

const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const contacts = ref([])
const filteredContacts = ref([])
const search = ref('')
const isScrolled = ref(false)

//methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20 // pots ajustar el valor segons el teu cas
}
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 450 ? (mobilView.value = true) : (mobilView.value = false)
}
const sendMessage = (contactId) => {
  router.push({ name: 'chat', params: { contactId: contactId } })
}

const deleteContact = async (contactId) => {
  try {
    const response = await deleteContactById({ userId: auth.userId, contactId: contactId })
    if (!response.data.error.status) {
      contacts.value = contacts.value.filter((contact) => contact.id !== contactId)
      search.value = ''

      notifySuccess('contact deleted')
    }
  } catch (error) {
    notifyError(error)
  }
}

//computed
const displayedContacts = computed(() => {
  return filteredContacts.value.length ? filteredContacts.value : contacts.value
})

watch(
  () => search.value,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      filteredContacts.value = contacts.value.filter(
        (contact) => contact.name.includes(newValue) || contact.lastname.includes(newValue),
      )
    } else {
      filteredContacts.value = []
    }
  },
)
//hooks
onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  mobilView.value = window.innerWidth < 450
  window.addEventListener('resize', updateWidth)
  try {
    const response = await getContactsById({ userId: auth.userId })
    if (!response.data.error.status) {
      contacts.value = response.data.data
    }
  } catch (error) {
    notifyError(error)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.my-contacts {
  display: grid;
  grid-template-columns: 1fr;
  height: min-content;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
  color: whitesmoke;
  background-color: rgb(49, 49, 48);
  border-radius: 13px;
  width: 12rem;
}
.contacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  align-content: center;
  width: 100%;
  padding: 2rem;
  gap:1rem;
  justify-items: center;
  height: fit-content;
  padding-top: 5rem;
}
.name {
  text-align: center;
  font-weight: bold;
}
.avatar:hover {
  cursor: pointer;
  box-shadow: 0 0 12px 4px rgba(40, 167, 69, 0.6);
  border-radius: 50%;
}
.selected {
  box-shadow: 0 0 12px 4px rgba(40, 137, 167, 0.925);
  border-radius: 50%;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.search-input {
  width: 100%;
  position: sticky;
  top: 7.2rem;
  backdrop-filter: blur(10px);
  z-index: 3;
  &.scrolled {
    background-color: #333;
    color: white;

    // Aconsegueix que el placeholder també canvii
    ::v-deep input::placeholder {
      color: #ccc;
    }
  }
}

.contacts-panel {
  display: grid;
  grid-template-rows: min-content 1fr;
  width: 100%;
  padding-bottom: 3rem;
  gap: 1rem;
  height: 100%;
}

.message {
  text-align: center;
  color: gray;
}
@media (max-width: 450px) {
  .search-input {
    top: 3.6rem;
    z-index: 1;
  }
  .contacts-panel {
    padding-bottom: 4rem;
  }
  .my-contacts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
  .contacts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    height: fit-content;
    justify-content: top;
    padding-top: 3.6rem;
  }
}
</style>
