import { defineBoot } from '#q-app/wrappers'
import MQTT from 'src/utils/mqttManager'

export default defineBoot(({ app }) => {
  const ip = 'localhost'
  //  const ip = 'localhost'

  const port = '9001'

  if (ip && port) {
    let mqtt = new MQTT(ip, port)
    mqtt.connect()

    app.provide('appGlobal/mqtt', mqtt)
  }
})
