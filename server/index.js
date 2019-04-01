const WebSocket = require('ws')
const orders = require('./data/orders')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: ', message)
  })

  ws.send(JSON.stringify(orders))
})
