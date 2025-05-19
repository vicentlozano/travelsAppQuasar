<template>
  <div class="contacts-panel" v-if="displayedContacts">
    <q-input
      v-if="displayedContacts"
      v-model="search"
      debounce="500"
      filled
      placeholder="Search"
      class="search-input"
      bg-accent
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-scroll-area class="scroll-area"
      ><section class="my-contacts" v-for="contact in displayedContacts" :key="contact.id">
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
        </section></section
    ></q-scroll-area>
  </div>
  <div v-else class="no-contacts">
    <h3>Contacts List Empty!</h3>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
// import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { getContactsById } from 'src/utils/api'
import { notifyError, notifySuccess } from 'src/utils/utilsNotify'
import { useRouter } from 'vue-router'
import { deleteContactById } from 'src/utils/api'

//data
const auth = useUserStore()
const router = useRouter()

const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const contacts = ref(null)
const filteredContacts = ref([])
const search = ref('')
//methods
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
</script>

<style lang="scss" scoped>
.my-contacts {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  height: min-content;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid orange;
  border-radius: 15px;
  width: 80vw;
  max-width: 1000px;
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
  top: 0rem;
  z-index: 3;
}
.scroll-area {
  width: 100%;
  height: 99%;
}
::v-deep(.q-scrollarea__content) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 0rem 1rem 0rem 0rem;
}

.contacts-panel {
  display: grid;
  grid-template-rows: min-content 1fr;
  width: 100%;
  gap: 1rem;
  height: 100%;
}
.no-contacts {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
}
@media (max-width: 450px) {
}
</style>
