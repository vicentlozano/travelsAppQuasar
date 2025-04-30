import { Notify } from 'quasar'

export function notifySuccess(msg, itemName) {
  Notify.create({
    message: itemName ? itemName + ' ' + msg : msg,
    color: 'positive',
    badgeColor: 'white',
    badgeTextColor: 'positive',
    icon: 'check_circle_outline',
    iconColor: 'white',
    position: 'top',
  })
}
export function notifySuccessCenter(msg, itemName) {
  Notify.create({
    message: itemName ? itemName + ' ' + msg : msg,
    color: 'positive',
    badgeColor: 'white',
    badgeTextColor: 'positive',
    icon: 'check_circle_outline',
    iconColor: 'white',
    timeout: 3000,
    position: 'center',
  })
}

export function notifyError(msg) {
  Notify.create({
    message: msg,
    color: 'negative',
    badgeColor: 'white',
    badgeTextColor: 'negative',
    icon: 'highlight_off',
    iconColor: 'white',
    position: 'top',
  })
}
export function notifyErrorCenter(msg) {
  Notify.create({
    message: msg,
    color: 'negative',
    badgeColor: 'white',
    badgeTextColor: 'negative',
    icon: 'highlight_off',
    iconColor: 'white',
    position: 'center',
    timeout: 4000,

  })
}
