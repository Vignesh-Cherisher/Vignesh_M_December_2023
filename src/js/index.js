import * as htmlComponents from './htmlComponents.js'

let globalStorage = {}

htmlComponents.powerButton.addEventListener('click', function () {
  if (htmlComponents.powerButton.innerHTML === 'Off') {
    htmlComponents.powerButton.innerHTML = 'On'
    htmlComponents.powerButton.classList.add('power-button-on')
    setInitialStorageValue()
  } else {
    htmlComponents.powerButton.innerHTML = 'Off'
    htmlComponents.powerButton.classList.remove('power-button-on')
  }
})

function setInitialStorageValue() {
  for (let i = 1; i < 5; i++) {
    globalStorage[i-1] = []
    globalStorage[i - 1][0] = i
    globalStorage[i - 1][1] = 1
  }
}

htmlComponents.zoneSelectorCheckboxes.forEach((element, index) => {
  element.addEventListener('click', (event) => {
    findLastElementEntry()
    element.classList.add('last-entry')
  })
})

function findLastElementEntry() {
  htmlComponents.zoneSelectorCheckboxes.forEach((element, index) => {
    let result
    if (element.classList.contains('last-entry')) {
      result = index
      element.classList.remove('last-entry')
    }
    updateElementValuesToStorage(result)
  })
}

function updateElementValuesToStorage(entryNumber) {
  const zoneOrderNumber = htmlComponents.zoneOrderField.value
  const zoneTime = htmlComponents.zoneTimeField.value
  globalStorage[entryNumber][0] = zoneOrderNumber
  globalStorage[entryNumber][1] = zoneTime
}