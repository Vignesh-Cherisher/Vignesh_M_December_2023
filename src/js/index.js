import * as htmlComponents from './htmlComponents.js'

const observer = new MutationObserver(restartSprinkler)
let globalStorage = {}
let orderArray = []
let timeArray = []
let machineState = false
let sprinklerIntervalId
let timeInterval

disableElementsOnRunMode()

function restartSprinkler() {
  if (htmlComponents.minutes.innerHTML !== '00') {
    clearInterval(sprinklerIntervalId)
    clearInterval(timeInterval)
    turnOffAllIndicators()
    runSprinklers()
    setTimeout(() => {
      startTimer()
    },1000)
  }
}

htmlComponents.powerButton.addEventListener('click', function () {
  if (htmlComponents.powerButton.innerHTML === 'Off') {
    htmlComponents.powerButton.innerHTML = 'On'
    htmlComponents.modeOptionCheckbox.disabled = false
    htmlComponents.powerButton.classList.add('power-button-on')
    enableElementsOnSetupMode()
    setInitialStorageValue()
    observer.observe(htmlComponents.minutes,observerOptions)
    machineState = true
  } else {
    htmlComponents.powerButton.innerHTML = 'Off'
    htmlComponents.modeOptionCheckbox.checked = false
    htmlComponents.modeOptionCheckbox.disabled = true
    disableElementsOnRunMode()
    resetTimer()
    observer.disconnect()
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
    retrieveElementValueFromStorage(index)
  })
})

function retrieveElementValueFromStorage(entryNumber) {
  htmlComponents.zoneOrderField.value = globalStorage[entryNumber][0]
  htmlComponents.zoneTimeField.value = globalStorage[entryNumber][1]
}

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
    let validation = validateZoneOrder()
    if (validation === true) {
      startTimer()
      disableElementsOnRunMode()
      runSprinklers()
    } else {
      htmlComponents.modeOptionCheckbox.checked = false
      let indexNumber = findNextIndicator(1)
      htmlComponents.zoneSelectorCheckboxes[indexNumber].checked = true
      retrieveElementValueFromStorage(indexNumber)
    }
  } else {
    resetTimer()
    enableElementsOnSetupMode()
  }
})

function validateZoneOrder() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (globalStorage[i][0] === globalStorage[j][0] && i !== j) {
        alert('Warning! The same order is set for the zones.')
        return false
      }
    }
  }
  return true
}

function disableElementsOnRunMode() {
  htmlComponents.zoneSelectorCheckboxes.forEach((element) => {
    element.disabled = true
  })
  htmlComponents.zoneOrderField.disabled = true
  htmlComponents.zoneTimeField.disabled = true
}

function enableElementsOnSetupMode() {
  htmlComponents.zoneSelectorCheckboxes.forEach((element) => {
    element.disabled = false
  })
  htmlComponents.zoneOrderField.disabled = false
  htmlComponents.zoneTimeField.disabled = false
}

function runSprinklers() {
  updateOrderArray()
  let index = 1
  let timeRun = 0
  let indexNumber = findNextIndicator(index)
  turnOnIndicator(indexNumber)
  sprinklerIntervalId = setInterval(() => {
    if (htmlComponents.modeOptionCheckbox.checked === false || machineState === false || index === 5) {
      turnOffAllIndicators()
      clearInterval(sprinklerIntervalId)
    } else {
      timeRun += 1
      if (timeArray[indexNumber] === timeRun) {
        turnOffIndicator(indexNumber)
        timeRun = 0
        index += 1
        indexNumber = findNextIndicator(index)
        turnOnIndicator(indexNumber)
      } else {
        turnOnIndicator(indexNumber)
      }
    }
  },1000)
}

function updateOrderArray() {
  orderArray = []
  timeArray = []
  for (let i = 0; i < 4; i++) {
    orderArray.push(globalStorage[i][0])
    timeArray.push(globalStorage[i][1])
  }
}

function turnOnIndicator(zoneTime) {
  htmlComponents.indicatorButtons.forEach(element => {
    if (element.id === zoneTime.toString()) {
      element.classList.add('zone-indicator-on')
    }
  })
}

function turnOffIndicator(zoneTime) {
  htmlComponents.indicatorButtons.forEach(element => {
    if (element.id === zoneTime.toString()) {
      element.classList.remove('zone-indicator-on')
    }
  })
}

function turnOffAllIndicators() {
  htmlComponents.indicatorButtons.forEach(element => {
    if (element.classList.contains('zone-indicator-on')) {
      element.classList.remove('zone-indicator-on')
    }
  })
}

function findNextIndicator(targetNumber) {
  for (let i = 0; i < orderArray.length; i++) {
    if (orderArray[i] === targetNumber) {
      return i
    }
  }
}

function startTimer() {
  incrementSeconds()
  timeInterval = setInterval(() => {
    if (machineState === false || htmlComponents.modeOptionCheckbox.checked === false) {
      clearInterval(timeInterval)
    } else {
      incrementSeconds()
    }
  },1000)
}

function resetTimer() {
  htmlComponents.seconds.innerHTML = '00'
  htmlComponents.minutes.innerHTML = '00'
}

function incrementSeconds() {
  let secondValue = htmlComponents.seconds.innerHTML
  secondValue = parseInt(secondValue)
  secondValue+=1
  if (secondValue < 60) {
    secondValue = zeroPad(secondValue)
  } else {
    addMinute()
    secondValue = '00'
  }
  htmlComponents.seconds.innerHTML = secondValue 
}

function addMinute() {
  let minuteValue = htmlComponents.minutes.innerHTML
  minuteValue = parseInt(minuteValue)
  minuteValue += 1
  htmlComponents.minutes.innerHTML = zeroPad(minuteValue)
}

function zeroPad(secondsValue) {
  if (secondsValue < 10) {
    return '0' + secondsValue
  } else {
    return secondsValue.toString()
  }
}

const observerOptions = {
  childList: true,
  subtree: true,
};
