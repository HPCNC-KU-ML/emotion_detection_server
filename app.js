const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'

let spawn = require("child_process").spawn;
let pythonProcess = spawn("python", ["./../utility/test.py"]);

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Push
app.get('/predict', (req, res) => {
  // push block
  this.message = pythonProcess.stdout.on("data", data => {
    return data;
  });
  // let msg = 'Hello I am Jurina Matsui!'
  push(msg)
  res.send(msg)
})

// Reply
app.post('/predict', (req, res) => {
  let msg = 'Recieve'
  res.send(msg)
  reply(msg)
  res.sendStatus(200)
  console.log(msg)
})

function push(msg) {
  let body = JSON.stringify({
    // push body
    to: 'U84499a6b6a18dddd28dc255e44a9b669',
    messages: [{
      type: 'text',
      text: msg
    }]
  })
  // curl
  // curl('push', body)
}

function reply(msg) {
  let body = JSON.stringify({
    messages: [{
      type: 'text',
      text: msg
    }]
  })
  // curl('reply', body)
}

// function curl(method, body) {
//   console.log('method:' + method)
//   request.post({
//     url: 'https://api.line.me/v2/bot/message/' + method,
//     body: body
//   }, (err, res, body) => {
//     console.log('status = ' + res.statusCode)
//     console.log(err);

//   })
// }

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
