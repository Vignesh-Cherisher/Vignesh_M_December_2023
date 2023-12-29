export const headerElements = document.querySelectorAll('.header-elements')
export const registrationContainer = document.querySelector('#registration-container')
export const loginContainer = document.querySelector('#login-container')
export const signInLink = document.querySelector('#sign-in-link')
export const signUpLink = document.getElementById('sign-up-link')
export const signUpButton = document.querySelector('#sign-up-button')
export const signInButton = document.querySelector('#sign-in-button')
export const signInInputs = document.querySelectorAll('.sign-in-entries')
export const signUpInputs = document.querySelectorAll('.sign-up-entries')
export const errorColumns = document.querySelectorAll('.error-column')
export const userName = document.querySelector('.user-name')
export const userAccount = document.querySelector('.user-account')
export const logOutContainer = document.querySelector('.log-out-container')
export const totalTasksDisplay = document.getElementById('total-tasks-display')
export const inProgressDisplay = document.getElementById('in-progress-display')
export const tasksDoneDisplay = document.getElementById('tasks-done-display')
export const taskLists = document.querySelectorAll('.task-list')
export const todoList = document.getElementById('todo-list')
export const progressList = document.getElementById('progress-list')
export const reviewList = document.getElementById('review-list')
export const doneList = document.getElementById('done-list')
export const addUpdateTasksOverlay = document.querySelector('.add-update-tasks-overlay')
export const btnKanbanButtons = document.querySelectorAll('.kanban-button')
export const btnsAddTask = document.querySelector('#add-task-button')
export const taskFormEntries = document.querySelectorAll('.task-form-entries')
export const btneditTaskButton = document.querySelector('button#edit-task-button')
export const btncancelAddUpdateTask = document.querySelector('button#cancel-add-update-task')
export const taskItemIds = document.querySelectorAll('.task-item-id')

/**
 *
 */
export function getTotalTaskItems () {
  return [...document.querySelectorAll('.task-item')]
}

/**
 *
 */
export function getInProgressTaskItems () {
  return [...progressList.querySelectorAll('.task-item')]
}

/**
 *
 */
export function getDoneTaskItems () {
  return [...doneList.querySelectorAll('.task-item')]
}

/**
 *
 */
export function getTaskIds () {
  return [...document.querySelectorAll('.task-item-id')]
}
