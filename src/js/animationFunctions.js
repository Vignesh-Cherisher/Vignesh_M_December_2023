import { headerElements, loginContainer, registrationContainer } from './htmlComponents.js'

headerElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    const isActive = element.classList.contains('active')
    const otherElementIndex = parseInt(index) === 0 ? 1 : 0
    if (!isActive) {
      element.classList.add('active')
      headerElements[parseInt(otherElementIndex)].classList.remove('active')
      if (otherElementIndex === 1) {
        loginContainer.classList.remove('animate-move-behind')
        registrationContainer.classList.remove('animate-bring-front')
        loginContainer.classList.add('animate-bring-front')
        registrationContainer.classList.add('animate-move-behind')
      } else {
        loginContainer.classList.remove('animate-bring-front')
        registrationContainer.classList.remove('animate-move-behind')
        loginContainer.classList.add('animate-move-behind')
        registrationContainer.classList.add('animate-bring-front')
      }
    }
  })
})
