const express = require('express')
const path = require('path')
const { writeFile, readFileSync } = require('fs')
const defaultPath = './src/db/index.json'
const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/login.html'))
})

router.get('/owner', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/owner.html'))
})

router.get('/notFound', (req, res) => {
  console.log('error')
  res.sendFile(path.join(__dirname, '/src/notFound.html'))
})

router.get('/get-board-data', (req, res) => {
  const data = readFileSync(defaultPath)
  let parsedData
  let responseResult
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
    parsedData.tasks = {}
  } finally {
    responseResult = parsedData.tasks
  }
  res.json(responseResult)
})

app.post('/user-register', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
    parsedData.users = {}
    parsedData.tasks = {}
  } finally {
    for (const i in parsedData.users) {
      if (i === postData.userEmail) {
        responseResult = 'email-error'
      }
    }
    if (responseResult !== 'email-error') {
      parsedData.users[postData.userEmail] = postData
      responseResult = [parsedData.users[postData.userEmail]]
    }
    writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error)
        return
      }
      console.log('Data written successfully to disk')
    })
  }
  res.json(responseResult)
})

app.post('/user-login', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData = {}
  try {
    parsedData = JSON.parse(data)
    if (parsedData.users[postData.userEmail] !== undefined) {
      if (parsedData.users[postData.userEmail].password === postData.password && parsedData.users[postData.userEmail].userEmail === postData.userEmail) {
        responseResult = [parsedData.users[postData.userEmail]]
      }
    }
  } catch (err) {
    parsedData = {}
    parsedData.users = {}
    parsedData.tasks = {}
  }
  res.json(responseResult)
})

app.post('/add-task', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
    parsedData.users = {}
    parsedData.tasks = {}
  } finally {
    parsedData.tasks[postData.taskId] = postData
    responseResult = [parsedData.tasks[postData.taskId]]
  }
  writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error)
      return
    }
    console.log('Data written successfully to disk')
  })
  res.json(responseResult)
})

app.post('/update-task-status', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
    parsedData.users = {}
    parsedData.tasks = {}
  } finally {
    parsedData.tasks[postData.taskId].taskStatus = postData.taskStatus
    responseResult = true
  }
  writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error)
      return
    }
    console.log('Data written successfully to disk')
  })
  res.json(responseResult)
})

app.use('/', router)

const port = 5002
app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on PORT http://localhost:${port}`)
})
