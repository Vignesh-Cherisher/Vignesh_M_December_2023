import * as htmlComponents from './htmlComponents.js'

let globalStorage = {}
let orderArray = []
let timeArray = []
let machineState = false

htmlComponents.powerButton.addEventListener('click', function () {
  if (htmlComponents.powerButton.innerHTML === 'Off') {
    htmlComponents.powerButton.innerHTML = 'On'
    htmlComponents.powerButton.classList.add('power-button-on')
    setInitialStorageValue()
    machineState = true
  } else {
    htmlComponents.powerButton.innerHTML = 'Off'
    htmlComponents.modeOptionCheckbox.checked = false
    htmlComponents.powerButton.classList.remove('power-button-on')
    machineState = false
  }
})

function setInitialStorageValue() {
  for (let i = 1; i < 5; i++) {
    globalStorage[i-1] = []
    globalStorage[i - 1][0] = i
    orderArray.push(i)
    globalStorage[i - 1][1] = 1
    timeArray.push(1)

  }
}

htmlComponents.zoneSelectorCheckboxes.forEach((element, index) => {
  element.addEventListener('click', (event) => {
    const elementIndex = findLastElementEntry()
    updateElementValuesToStorage(elementIndex)
    element.classList.add('last-entry')
  })
})

function findLastElementEntry() {
  let result
  htmlComponents.zoneSelectorCheckboxes.forEach((element, index) => {
    if (element.classList.contains('last-entry')) {
      result = index
      element.classList.remove('last-entry')
    }
  })
  return result
}

function updateElementValuesToStorage(entryNumber) {
  const zoneOrderNumber = htmlComponents.zoneOrderField.value
  const zoneTime = htmlComponents.zoneTimeField.value
  globalStorage[entryNumber][0] = parseInt(zoneOrderNumber)
  globalStorage[entryNumber][1] = parseInt(zoneTime)
}

htmlComponents.modeOptionCheckbox.addEventListener('click', function () {
  if (htmlComponents.modeOptionCheckbox.checked === true) {
    htmlComponents.zoneSelectorCheckboxes.forEach((element) => {
      element.disabled = true
    })
    htmlComponents.zoneOrderField.disabled = true
    htmlComponents.zoneTimeField.disabled = true
    runSprinklers()
  } else {
    htmlComponents.zoneSelectorCheckboxes.forEach((element) => {
      element.disabled = false
    })
    htmlComponents.zoneOrderField.disabled = false
    htmlComponents.zoneTimeField.disabled = false
    stopSprinklers()
  }
})

function runSprinklers() {
  updateOrderArray()
  // turnIndicators()
}

function updateOrderArray() {
  orderArray = []
  timeArray = []
  for (let i = 0; i < 4; i++) {
    orderArray.push(globalStorage[i][0])
    timeArray.push(globalStorage[i][1])
  }
}

function turnIndicators() {
  for (let i = 1; i < 5; i++) {
    if (machineState === false) {
      break
    }
    const indexNumber = findNextIndicator(i)
    htmlComponents.indicatorButtons.forEach(element => {
      if (element.id === indexNumber.toString()) {
        element.classList.add('zone-indicator-on')
      }
    })
    setTimeout(() => {
      console.log('waiting')
    }, timeArray[indexNumber] * 1000)
    if (i === 4) {
      i = 1
    }
  }
}

function findNextIndicator(targetNumber) {
  for (let i = 0; i < orderArray.length; i++) {
    if (orderArray[i] === targetNumber) {
      return i
    }
  }
}

function startTimer() {
 
}

function incrementSeconds() {
  const secondValue = htmlComponents.seconds.innerHTML
  const i = setInterval(() => {
    if (machineState === false) {
      clearInterval(i)
    }
    secondValue = ++parseInt(secondValue)
    if (secondValue < 60) {
      timeValueLesserThanTen(secondValue)
    } else {
      addMinute()
      secondValue = '00'
    }
    htmlComponents.seconds.innerHTML = secondValue 
  },1000)
}

function addMinute() {

}

function timeValueLesserThanTen(secondsValue) {
  if (secondsValue <= 10) {
    return '0' + secondsValue
  } else {
    return secondsValue.toString()
  }
}

function stopSprinklers() {
  
}
