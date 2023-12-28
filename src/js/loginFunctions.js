import * as apiFunctions from './apiFunctions.js'

/**
 *
 * @param signInFields
 */
export function signInHandler (signInFields) {
  const signInFieldValues = []
  let postData = true
  let serverResponse
  signInFields.forEach(element => {
    if (element.value !== '') {
      signInFieldValues.push(element.value)
    } else {
      postData = false
      window.alert(`Fill in ${element.id.split('-')[0]} Field to Continue`)
    }
  })
  if (postData !== false) {
    serverResponse = apiFunctions.postSignInData(signInFieldValues)
    return serverResponse
  } else {
    return false
  }
}

/**
 *
 * @param signUpFields
 */
export async function signUpHandler (signUpFields) {
  const signUpFieldValues = []
  let postData = true
  signUpFields.forEach(element => {
    if (element.value !== '') {
      signUpFieldValues.push(element.value)
    } else {
      postData = false
      window.alert(`Fill in ${element.id.split('-')[0]} Field to Continue`)
    }
  })
  let serverResponse
  if (postData !== false) {
    serverResponse = await apiFunctions.postSignUpData(signUpFieldValues)
    return serverResponse
  } else {
    return false
  }
}

/**
 *
 * @param input
 */
export function validateEmail (input) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (input.value.match(emailRegex)) {
    return true
  } else {
    window.alert('Invalid email address!')
    return false
  }
}
