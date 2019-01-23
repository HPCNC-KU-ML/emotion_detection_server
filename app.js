const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const hostname = 'localhost'

let spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Push
app.get('/predict', async (req, res) => {

  let process = spawn('python', ["./utility/test.py",
    'Jirayu',
    'Laungwilawan'
  ])

  process.stdout.on('data', function (data) {
    res.send(data.toString())
  })

})

// Reply
app.post('/predict', (req, res) => {
  let msg = 'Recieve'
  res.send(msg)
  res.sendStatus(200)
  console.log(msg)
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
