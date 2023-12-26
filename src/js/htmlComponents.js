export const headerElementss = document.querySelectorAll('.header-elements')
export const dataAddSearchContainers = document.getElementsByClassName('data-add-search-container')
export const btnaddUpdateButton = document.querySelector('#add-update-button')
export const addUpdateEntries = document.querySelectorAll('.add-update-entries')
export const dataDisplayGrid = document.querySelector('.data-display-grid')
export const dataDisplayColumns = document.querySelectorAll('.data-display-column')
export const btnsearchButton = document.querySelector('#search-button')
export const searchEntries = document.querySelectorAll('.search-entries')
export const details = document.getElementById('details')
export const condition = document.getElementById('condition')
export const inputSearch = document.getElementById('fromdate-input-search')
export const inputSearchWithinDate = document.querySelectorAll('.input-search-within-date')

export function getDisplayColumns() {
  return [...document.querySelectorAll('.data-display-column')]
}

export function getCardNumberFields() {
  return [...document.querySelectorAll('.card-number-field')]
}

export function getDisplayDataFields(parentContainer) {
  return [...parentContainer.querySelectorAll('.display-data')]
}