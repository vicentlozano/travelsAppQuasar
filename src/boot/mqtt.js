import { defineBoot } from '#q-app/wrappers'
import MQTT from 'src/utils/mqttManager'

export default defineBoot(({ app }) => {
  const ip = 'travlesbackend-bmg4gtc5a0d9bbbd.canadacentral-01.azurewebsites.net'
  const port = '9001'

  if (ip && port) {
    let mqtt = new MQTT(ip, port)
    mqtt.connect()

    app.provide('appGlobal/mqtt', mqtt)
  }
})
