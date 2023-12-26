import * as htmlComponents from './htmlComponents.js'
import * as apiFunctions from './apiFunctions.js'
import * as formFunctions from './formFunctions.js'

htmlComponents.headerElementss.forEach((element, index) => {
  element.addEventListener('click', () => {
    let otherElementIndex = index === 0 ? 1 : 0
    element.classList.add('active')
    htmlComponents.dataAddSearchContainers[index].classList.add('active')
    htmlComponents.headerElementss[otherElementIndex].classList.remove('active')
    htmlComponents.dataAddSearchContainers[otherElementIndex].classList.remove('active')
  })
})

htmlComponents.btnaddUpdateButton.addEventListener('click', async() => {
  const addedData = await apiFunctions.addUpdateHandler(htmlComponents.addUpdateEntries)
  if (addedData !== false) {
    appendToDisplayData(addedData)
  }
})

function appendToDisplayData(entryData) {
  const updateStatus = checkAddOrUpdation(entryData)
  if (updateStatus !== 'addition') {
    updateDisplayColumn(entryData, updateStatus)
  } else {
    const serialNumber = htmlComponents.getDisplayColumns().length
    const htmlMarkup = `<div class="data-display-column">
              <p class="display-data">${serialNumber}</p>
              <p class="display-data card-number-field">${entryData.cardNumber}</p>
              <p class="display-data">${entryData.holderFirstName}</p>
              <p class="display-data">${entryData.holderLastName}</p>
              <p class="display-data">${entryData.expiryDate}</p>
            </div>`
    htmlComponents.dataDisplayGrid.insertAdjacentHTML('beforeend', htmlMarkup)
  }
}

function checkAddOrUpdation(inputData) {
  const cardNumberFields = htmlComponents.getCardNumberFields()
  for (let i = 0; i < cardNumberFields.length; i++) {
    if (inputData.cardNumber === cardNumberFields[i].innerHTML) {
      return i +1 
    }
  }
  return 'addition'
}

function updateDisplayColumn(entryData, iterationCount) {
  const dataDisplayColumns = htmlComponents.getDisplayColumns()
  const displayDataFields = htmlComponents.getDisplayDataFields(dataDisplayColumns[iterationCount])
  let iterator = 1
  for (const field in entryData) {
    displayDataFields[iterator++].innerHTML = entryData[field]
  }
}