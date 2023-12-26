import { padZeros, getFirstName, getLastName } from "./formFunctions.js"

export function addUpdateHandler(inputs) {
  const addUpdateEntriesValues = []
  let postData = true
  let serverResponse
  inputs.forEach((element,index) => {
    if (index === 0 && element.value !== '') {
      const paddedValue = padZeros(element.value)
      addUpdateEntriesValues.push(paddedValue)
    } else if (index === 1 && element.value !== '') {
      const firstName = getFirstName(element.value)
      const lastName = getLastName (element.value)
      addUpdateEntriesValues.push(firstName)
      addUpdateEntriesValues.push(lastName)
    } else if (element.value !== '') {
      addUpdateEntriesValues.push(element.value)
    } else {
      postData = false
      window.alert(`Fill in ${element.id.split('-')[0]} Field to Continue`)
    }
  })
  if (postData !== false) {
    serverResponse = postAddUpdateData(addUpdateEntriesValues)
    return serverResponse
  } else {
    return false
  } 
}

async function postAddUpdateData(inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    cardNumber: inputFieldValues[0],
    holderFirstName: inputFieldValues[1],
    holderLastName: inputFieldValues[2],
    expiryDate: inputFieldValues[3]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/add-update-entry', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}