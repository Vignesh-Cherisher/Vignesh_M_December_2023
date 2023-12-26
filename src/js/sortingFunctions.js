import { details, inputSearch, condition, searchEntries } from "./htmlComponents.js"
import { loadInitialRecords } from "./apiFunctions.js"
const sortedArray = []
const unSortedArray = []

async function getDisplayData() {
  const displayData = await loadInitialRecords()
  const displayDataArray = []
  for (const record in displayData) {
    displayDataArray.push(displayData[record])
  }
  return displayDataArray
}

function sortHandler(searchFieldValues) {
  switch (searchFieldValues[0]) {
    case 'cardNumber':
      loadCardNumberData()
      break
    case 'cardHolderFirstName':
      loadCardFirstNameData()
      break
    case 'cardHolderLastName':
      loadCardLastNameData()
      break
    case 'cardExpiry':
      loadCardExpiryData()
      break
  }
  switch (searchFieldValues[1]) {
    case 'equals':
      filterOnValueEquals(searchFieldValues)
      break
    case 'not equals':
      filterOnValueNotEquals(searchFieldValues)
      break
    case 'contains':
      filterOnValueContains(searchFieldValues)
      break
    case 'begins with':
      filterOnValueBegins(searchFieldValues)
      break
    case 'ends with':
      filterOnValueEnds(searchFieldValues)
      break
    case 'in':
      filterOnDateIn(searchFieldValues)
      break
    case 'on':
      filterOnDateOn(searchFieldValues)
      break
    case 'before':
      filterOnDateBefore(searchFieldValues)
      break
    case 'after':
      filterOnDateAfter(searchFieldValues)
      break
    case 'within':
      filterOnDateWithin(searchFieldValues)
      break
  }
}

function filterOnValueEquals(inputFieldValue) {

}