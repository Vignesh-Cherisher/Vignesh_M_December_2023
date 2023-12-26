import { details,inputSearch,condition,searchEntries } from "./htmlComponents.js"
function sortHandler(searchFieldValues) {
  switch (searchFieldValues[0]) {
    case 'card-number':
      filterOnNumber(searchFieldValues)
      break
    case 'card-holder-first-name':
      filterOnFirstName(searchFieldValues)
      break
    case 'card-holder-last-name':
      filterOnLastName(searchFieldValues)
      break
    case 'card-expiry':
      filterOnExpiry(searchFieldValues)
      break
  }
}

function filterOnNumber(searchFieldValues) {
  switch (searchFieldValues[1]) {
    case 'equals':
      filterOnNumberEquals(searchFieldValues)
      break
    case 'not equals':
  }
}

function filterOnNumberEquals() {

}