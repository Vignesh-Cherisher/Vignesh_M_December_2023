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
