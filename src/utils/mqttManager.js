import mqtt from 'mqtt'
export default class MQTT extends EventTarget {
  constructor(host, port, options) {
    super()
    this.host = host
    this.port = port
    this.options = options

    /**
     * === Quality of Service ===
     * QoS0: Sin seguridad de que el mensaje llega correctamente
     * QoS1: Con seguridad minima de que el mensaje llega correctamente
     * QoS2: Con seguridad de que el mensaje llega correctamente
     */
    this.qos = 2
    this.retain = true
    this.clientConnected = false

    this.client = undefined
    this.subscribedTopics = []
  }

  connect() {
    return new Promise((resolve, reject) => {
      //for production
     let connectUrl = `wss://${this.host}/mqtt`
      //for local develop
       //let connectUrl =  `ws://${this.host}:${this.port}`;

      try {
        this.client = mqtt.connect(connectUrl, this.options)

        this.client.on('connect', () => {
          this.clientConnected = true
          this.dispatchEvent(new Event('connected'))
          resolve(true)
        })

        this.client.on('error', (error) => {
          this.dispatchEvent(new Event('generalError', error))
          reject('mqtt.connect error: ', error)
        })

        this.client.on('message', (topic, message) => {
          this.dispatchEvent(new Event('message', message))
          let subscribedTopic = this.subscribedTopics.find(
            (subscribedTopic) => subscribedTopic.name === topic,
          )

          if (subscribedTopic) {
            subscribedTopic.cb(message)
          }
        })
      } catch (error) {
        console.log(error)

        this.dispatchEvent(new Event('generalError', error))
        reject('mqtt.connect error: ', error)
      }
    })
  }

  subscribe(topic, cb = () => {}) {
    return new Promise((resolve, reject) => {
      if (this.subscribedTopics.some((subscribedTopic) => subscribedTopic.name === topic)) {
        console.error('You are already subscribed to this topic! (' + topic + ')')
      } else {
        this.client.subscribe(topic, 0, (error, res) => {
          if (error) {
            this.dispatchEvent(new Event('generalError', error))
            reject(error)
          } else {
            this.subscribedTopics.push({
              name: topic,
              cb,
            })

            resolve(res)
          }
        })
      }
    })
  }

  unSubscribe(topic) {
    return new Promise((resolve, reject) => {
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          reject('Unsubscribe error', error)
        }
        resolve(true)
        let pos = undefined
        this.subscribedTopics.forEach((subscribedTopic, index) => {
          if (subscribedTopic.name === topic) {
            pos = index
          }
        })
        this.subscribedTopics.splice(pos, 1)
      })
    })
  }

  unSubscribeFromAllTopics() {
    let aux = []

    this.subscribedTopics.forEach((topic) => {
      aux.push(this.unSubscribe(topic.name))
    })

    return Promise.all(aux)
  }

  publish(topic, payload) {
    return new Promise((resolve, reject) => {
      this.client.publish(
        topic,
        payload,
        {
          qos: this.qos,
          retain: this.retain,
        },
        (error) => {
          if (error) {
            reject('Publish error', error)
          } else {
            resolve(true)
          }
        },
      )
    })
  }

  destroy() {
    return new Promise((resolve, reject) => {
      if (this.clientConnected) {
        try {
          this.client.end()
          this.clientConnected = false
          resolve(true)
        } catch (error) {
          reject('Disconnect failed', error.toString())
        }
      } else {
        reject("Can't disconnect if your are not connected!")
      }
    })
  }
}
