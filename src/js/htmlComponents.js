export const headerElementss = document.querySelectorAll('.header-elements')
export const dataAddSearchContainers = document.getElementsByClassName('data-add-search-container')
export const btnaddUpdateButton = document.querySelector('#add-update-button')
export const addUpdateEntries = document.querySelectorAll('.add-update-entries')
export const dataDisplayGrid = document.querySelector('.data-display-grid')
export const dataDisplayColumns = document.querySelectorAll('.data-display-column')

export function getDisplayColumns() {
  return [...document.querySelectorAll('.data-display-column')]
}

export function getCardNumberFields() {
  return [...document.querySelectorAll('.card-number-field')]
}

export function getDisplayDataFields(parentContainer) {
  return [...parentContainer.querySelectorAll('.display-data')]
}