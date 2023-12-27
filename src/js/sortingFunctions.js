import { details, inputSearch, condition, searchEntries } from "./htmlComponents.js"
import { loadInitialRecords } from "./apiFunctions.js"
import {updateDisplayData} from './main.js'

async function getDisplayData() {
  const displayData = await loadInitialRecords()
  const displayDataArray = []
  for (const record in displayData) {
    displayDataArray.push(displayData[record])
  }
  return displayDataArray
}

export function sortHandler(searchFieldValues) {
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

async function filterOnValueEquals(inputFieldValue) {
  let detailValue = details.value
  let displayDataArray = await getDisplayData()
  console.log(displayDataArray)
  displayDataArray = displayDataArray.filter((item) => item[detailValue] === inputFieldValue[2])
  updateDisplayData(displayDataArray)
}