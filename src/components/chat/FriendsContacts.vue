<template>
  <div class="bar">
    <div class="q-pa-md slider">
      <q-avatar
        v-for="contact in displayedContacts"
        :key="contact.id"
        size="40px"
        @click="(emits('recipientSelected', contact), (avatarSelected = contact.id))"
        :class="avatarSelected === contact.id ? 'avatar selected' : 'avatar'"
      >
        <q-tooltip
          v-if="!mobilView"
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          class="bg-purple"
        >
          {{ contact.name }}
        </q-tooltip>
        <img v-if="contact.avatar !== undefined && contact.avatar !== null" :src="contact.avatar" />
        <p v-else class="initial">
          {{
            contactChat.name.charAt(0).toUpperCase() + contactChat.lastname.charAt(0).toUpperCase()
          }}
        </p>
      </q-avatar>
    </div>

    <q-separator :vertical="!mobilView" />
  </div>
</template>

<script setup>
import { notifyError } from 'src/utils/utilsNotify'
import { ref, onMounted, watch, computed } from 'vue'
import { getContactsById } from '../../utils/api'

//props&emits
const props = defineProps({
  userId: {
    type: Number,
  },
  contactSearch: {
    type: String,
    required: false,
  },
  contactSelected: String,
  String,
})
const emits = defineEmits(['recipientSelected'])
//data
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
const contacts = ref(null)
const filteredContacts = ref([])
const avatarSelected = ref(props.userId)

//computed
const displayedContacts = computed(() => {
  return filteredContacts.value.length ? filteredContacts.value : contacts.value
})
watch(
  () => props.contactSearch,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      filteredContacts.value = contacts.value.filter((contact) =>
        (contact.name || contact.lastname).includes(newValue),
      )
    } else {
      filteredContacts.value = []
    }
  },
)
//methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 450 ? (mobilView.value = true) : (mobilView.value = false)
}
//hooks
onMounted(async () => {
  mobilView.value = window.innerWidth < 450
  window.addEventListener('resize', updateWidth)
  try {
    const response = await getContactsById({ userId: props.userId })
    if (!response.data.error.status) {
      contacts.value = response.data.data
      if (props.contactSelected) {
        let contact = contacts.value.filter(
          (contact) => contact.id === Number(props.contactSelected),
        )
        emits('recipientSelected', contact[0])
        avatarSelected.value = Number(props.contactSelected)
      } else {
        emits('recipientSelected', contacts.value[0])
        avatarSelected.value = contacts.value[0].id
      }
    }
  } catch (error) {
    notifyError(error)
  }
})
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
  gap: 1.1rem;
  width: max-content;
}
.bar {
  display: grid;
  grid-template-columns: 1fr min-content;
  width: 100%;
}
.initial {
  margin: 0;
  font-weight: 400;
}
.avatar:hover {
  cursor: pointer;
  box-shadow: 0 0 12px 4px rgba(40, 167, 69, 0.6);
  border-radius: 50%;
}
.selected {
  box-shadow: 0 0 12px 4px rgba(40, 167, 69, 0.6);
  border-radius: 50%;
}
@media (max-width: 450px) {
  .bar {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
  .slider {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    height: min-content;
    gap: 1.1rem;
    width: 100%;
    white-space: nowrap;
  }
}
</style>
