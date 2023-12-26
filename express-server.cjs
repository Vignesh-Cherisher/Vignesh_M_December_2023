const express = require('express')
const path = require('path')

let allData
const app = express()
app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())
app.get('/', (req, res) => {

})

app.post('/', (req, res) => {

})

const port = 5002
app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on PORT http://localhost:${port}`)
})