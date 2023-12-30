import * as htmlComponents from './htmlComponents.js'
import * as apiFunctions from './apiFunctions.js'
import * as dragFunctions from './dragFunctions.js'

(async () => {
  if (window.localStorage.getItem('userName' === null)) {
    apiFunctions.redirectToErrorPage()
  }
  await loadBoardData()
  dragFunctions.drag()
  displayAnalyticsData()
})()

htmlComponents.userName.innerHTML = window.localStorage.getItem('userName')
htmlComponents.userAccount.innerHTML = window.localStorage.getItem('userAccountType')

htmlComponents.logOutContainer.addEventListener('click', () => {
  window.localStorage.clear()
  apiFunctions.redirectToLoginPage()
})

/**
 *
 */
export function displayAnalyticsData () {
  showDoneTasks()
  showTotalTasks()
  showInProgress()
}

/**
 *
 */
function showTotalTasks () {
  const tasksCount = htmlComponents.getTotalTaskItems().length
  htmlComponents.totalTasksDisplay.innerHTML = tasksCount
}

/**
 *
 */
function showInProgress () {
  const tasksCount = htmlComponents.getInProgressTaskItems().length
  htmlComponents.inProgressDisplay.innerHTML = tasksCount
}

/**
 *
 */
function showDoneTasks () {
  const tasksCount = htmlComponents.getDoneTaskItems().length
  htmlComponents.tasksDoneDisplay.innerHTML = tasksCount
}

/**
 *
 */
async function loadBoardData () {
  const initialBoardData = await apiFunctions.getBoardData()
  if (Object.keys(initialBoardData).length === 0) {
    return
  }
  for (const i in initialBoardData) {
    appendTaskToBoard(initialBoardData[i])
  }
}

/**
 *
 * @param parentContainer
 * @param taskItemValues
 */
function appendTaskToBoard (taskItemValues) {
  const htmlMarkup = `            <li class="task-item" draggable="true">
              <p class="task-item-text">
                <span class="task-item-id"># ${taskItemValues.taskId}</span> -
                <span class="task-title">${taskItemValues.taskTitle}</span>
              </p>
              <div class="task-item-profile-container">
                <div class="assignee-container task-user-container">
                  <img src="../Assets/cherisher.png" alt="Assignee-profile" class="task-profile-piture" draggable="false">
                  <div class="task-user-info-container">
                    <p class="task-user-role">Assignee</p>
                    <p class="task-user-name">${taskItemValues.assigneeName !== '' ? taskItemValues.assigneeName : 'Name'}</p>
                  </div>
                </div>
                <div class="task-item-priority ${taskItemValues.priorityLevel}">${taskItemValues.priorityLevel}</div>
                <div class="reporter-container task-user-container">
                  <img src="../Assets/cherisher.png" alt="reporter-profile" class="task-profile-piture" draggable="false">
                  <div class="task-user-info-container">
                    <p class="task-user-role">Reporter</p>
                    <p class="task-user-name">${taskItemValues.reporterName !== '' ? taskItemValues.reporterName : 'Name'}</p>
                  </div>
                </div>
                <div class="task-item-date">${taskItemValues.dueData}</div>
              </div>
            </li>`
  const index = parseInt(taskItemValues.taskStatus)
  const parentContainer = htmlComponents.taskLists[index]
  parentContainer.insertAdjacentHTML('beforeend', htmlMarkup)
}

htmlComponents.btnKanbanButtons.forEach((element, index) => {
  element.addEventListener('click', () => {
    htmlComponents.btnsAddTask.classList.remove('hide-overlay')
    htmlComponents.btneditTaskButton.classList.add('hide-overlay')
    htmlComponents.addUpdateTasksOverlay.classList.remove('hide-overlay')
    window.localStorage.setItem('lastTaskStatus', index)
  })
})

htmlComponents.btncancelAddUpdateTask.addEventListener('click', () => {
  htmlComponents.addUpdateTasksOverlay.classList.add('hide-overlay')
})

htmlComponents.btnsAddTask.addEventListener('click', async () => {
  const taskItemValues = await apiFunctions.checkNewTaskData(htmlComponents.taskFormEntries, createTaskId(), window.localStorage.getItem('lastTaskStatus'))
  appendTaskToBoard(taskItemValues[0])
  htmlComponents.addUpdateTasksOverlay.classList.add('hide-overlay')
  displayAnalyticsData()
})

/**
 *
 */
function createTaskId () {
  let newTaskId = htmlComponents.getTaskIds().length
  newTaskId = padZeroes(newTaskId + 1)
  return newTaskId
}

/**
 *
 * @param taskId
 */
function padZeroes (taskId) {
  taskId = taskId.toString()
  let inputLength = taskId.length
  let paddedString = ''
  while (3 - inputLength > 0) {
    paddedString += '0'
    inputLength += 1
  }
  return paddedString + taskId
}
