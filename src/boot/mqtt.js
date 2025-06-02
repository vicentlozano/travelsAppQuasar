import { defineBoot } from '#q-app/wrappers'
import MQTT from 'src/utils/mqttManager'

export default defineBoot(({ app }) => {
  // for production 
  const ip = 'api.vilodev.com/mqtt'
  //for local
    // const ip = 'localhost' 

  const port = '9001'

  if (ip && port) {
    let mqtt = new MQTT(ip, port)
    mqtt.connect()

    app.provide('appGlobal/mqtt', mqtt)
  }
})
