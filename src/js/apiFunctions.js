/**
 *
 * @param inputFieldValues
 */
export async function postSignInData (inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    userEmail: inputFieldValues[0],
    password: inputFieldValues[1]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/user-login', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  console.log(fetchData)
  return (fetchData)
}

/**
 *
 * @param inputFieldValues
 */
export async function postSignUpData (inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    name: inputFieldValues[0],
    userEmail: inputFieldValues[1],
    password: inputFieldValues[2],
    accountType: inputFieldValues[3]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/user-register', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}

/**
 *
 */
export function redirectToOwnerPage () {
  window.location.assign('http://localhost:5002/owner')
}

/**
 *
 */
export function redirectToErrorPage () {
  window.location.replace('http://localhost:5002/notFound')
}

/**
 *
 */
export function redirectToLoginPage () {
  window.location.replace('http://localhost:5002/')
}

/**
 *
 * @param formEntries
 * @param taskId
 * @param status
 */
export async function checkNewTaskData (formEntries, taskId, status) {
  const taskFormValues = [taskId, status]
  let postData = true
  formEntries.forEach((element, index) => {
    if (element.value === '' && (index === 0 || index === 4)) {
      postData = false
      window.alert(`Fill in ${element.id.split('-')[0]} ${element.id.split('-')[1]} Field to Continue`)
    } else {
      taskFormValues.push(element.value)
    }
  })
  let serverResponse
  if (postData !== false) {
    serverResponse = await postNewTaskData(taskFormValues)
    return serverResponse
  } else {
    return false
  }
}

/**
 *
 * @param inputFieldValues
 */
export async function postNewTaskData (inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    taskId: inputFieldValues[0],
    taskStatus: inputFieldValues[1],
    taskTitle: inputFieldValues[2],
    assigneeName: inputFieldValues[3],
    reporterName: inputFieldValues[4],
    priorityLevel: inputFieldValues[5],
    dueData: inputFieldValues[6]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/add-task', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}

/**
 *
 */
export async function getBoardData () {
  const boardDataRequest = await fetch('/get-board-data')
    .then(request => request.json())
  return boardDataRequest
}

/**
 *
 * @param itemId
 * @param itemStatus
 */
export async function postStatusIndex (itemId, itemStatus) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    taskId: itemId,
    taskStatus: itemStatus
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/update-task-status', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}
