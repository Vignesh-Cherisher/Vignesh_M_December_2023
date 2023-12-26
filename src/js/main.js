import * as htmlComponents from './htmlComponents.js'
import * as apiFunctions from './apiFunctions.js'
import * as formFunctions from './formFunctions.js'
import * as sortingFunctions from './sortingFunctions.js'

(async () => {
  const initalRecords = await apiFunctions.loadInitialRecords()
  if (initalRecords !== null) {
    for (const record in initalRecords) {
      appendToDisplayData(initalRecords[record])
    }
  }
})()

htmlComponents.btnsearchButton.addEventListener('click', () => {
  searchHandler(htmlComponents.searchEntries)
})

htmlComponents.details.addEventListener('change', () => {
  updateConditionOptions(htmlComponents.details.value)
  updateInputOptions(htmlComponents.condition.value)
})

htmlComponents.condition.addEventListener('change', () => {
  updateInputOptions(htmlComponents.condition.value)
})

htmlComponents.headerElementss.forEach((element, index) => {
  element.addEventListener('click', () => {
    let otherElementIndex = index === 0 ? 1 : 0
    element.classList.add('active')
    htmlComponents.dataAddSearchContainers[index].classList.add('active')
    if (index === 1) {
      element.classList.add('bg-color-blue')
      htmlComponents.dataAddSearchContainers[index].classList.add('bg-color-blue')
    }
    if (otherElementIndex === 1) {
      htmlComponents.headerElementss[otherElementIndex].classList.remove('bg-color-blue')
      htmlComponents.dataAddSearchContainers[otherElementIndex].classList.remove('bg-color-blue')
    }
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
              <p class="display-data">${entryData.cardHolderFirstName}</p>
              <p class="display-data">${entryData.cardHolderLastName}</p>
              <p class="display-data">${entryData.cardExpiry}</p>
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

function updateConditionOptions(inputValue) {
  let conditionValues
  switch (inputValue) {
    case 'cardNumber':
      conditionValues = ['equals', 'not equals', 'contains','number']
      break
    case 'cardHolderFirstName':
    case 'cardHolderLastName':
      conditionValues = ['equals', 'not equals', 'contains', 'begins with', 'ends with', 'text']
      break
    case 'cardExpiry':
      conditionValues = ['in', 'on', 'before', 'after', 'within', 'month']
      break
  }
  changeConditions(conditionValues)
}

function changeConditions(conditionValues) {
  while (htmlComponents.condition.hasChildNodes()) {
    htmlComponents.condition.removeChild(htmlComponents.condition.firstChild);
  }
  for (let i = 0; i < conditionValues.length - 1;i++) {
    const conditionsSelectOption = document.createElement("option")
    conditionsSelectOption.value = conditionValues[i]
    conditionsSelectOption.textContent = conditionValues[i]
    htmlComponents.condition.appendChild(conditionsSelectOption)
  }
  htmlComponents.inputSearch.setAttribute('type',conditionValues[conditionValues.length-1])
}

function updateInputOptions(inputValue) {
  if (inputValue === 'in') {
    htmlComponents.inputSearch.setAttribute('type', 'number')
    htmlComponents.inputSearch.setAttribute('min', '1985')
    htmlComponents.inputSearch.setAttribute('max', '3000')
  } else if(htmlComponents.details.value === 'cardExpiry'){
    htmlComponents.inputSearch.setAttribute('type', 'month')
  }
  if (inputValue === 'within') {
    htmlComponents.inputSearchWithinDate.forEach(element => {
      element.hidden = false
    })
  } else {
    htmlComponents.inputSearchWithinDate.forEach(element => {
      element.hidden = true
    })
  }
}

function searchHandler(inputFields) {
  const searchFieldValues = []
  let searchData = true
  inputFields.forEach((element, index) => {
    if (index === 3 && htmlComponents.condition.value === 'within' && element.value === '') {
      searchData = false
      window.alert(`Fill in ${element.id.split('-')[0]} field to Continue`)
    } else if (element.value !== '') {
      searchFieldValues.push(element.value)
    } else {
      searchData = false
      window.alert(`Enter a Value for the ${element.id.split('-')[0]} field`)
    }
  })
  if(searchData !== false) {
    sortingFunctions.sortHandler(searchFieldValues)
  }
}