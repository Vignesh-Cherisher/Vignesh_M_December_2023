const express = require('express')
const path = require('path')
const app = express()
const { writeFile, readFileSync } = require('fs')
const defaultPath = './src/db/index.json'

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())

app.get('/load-initial-data', (req, res) => {
  let parsedData = {}
  const fileData = readFileSync(defaultPath, 'utf-8')
  try {
    parsedData = JSON.parse(fileData)
  } catch (err) {
    parsedData = {}
  } 
  res.json(parsedData)
})

app.post('/add-update-entry', (req, res) => {
  const postData = req.body
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
  } finally {
    parsedData[postData.cardNumber] = postData
    writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        return
      }
    })
  }
  res.json(postData)
})

const port = 5002
app.listen(port, function () {
  console.log(`Server listening on PORT http://localhost:${port}`)
})