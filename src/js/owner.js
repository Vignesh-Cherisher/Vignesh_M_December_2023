import * as htmlComponents from './htmlComponents.js'
import * as apiFunctions from './apiFunctions.js'

htmlComponents.userName.innerHTML = window.localStorage.getItem('userName')
htmlComponents.userAccount.innerHTML = window.localStorage.getItem('userAccountType');

(() => {
  displayAnalyticsData()
})()

htmlComponents.logOutContainer.addEventListener('click', () => {
  apiFunctions.redirectToLoginPage()
})

/**
 *
 */
function displayAnalyticsData () {
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
 * @param parentContainer
 * @param taskItemValues
 */
function appendTaskToBoard (taskItemValues) {
  const htmlMarkup = `            <li class="task-item" id="review-item">
              <p class="task-item-text">
                <span class="task-item-id"># ${taskItemValues[0].taskId}</span> -
                <span class="task-title">${taskItemValues[0].taskTitle}</span>
              </p>
              <div class="task-item-profile-container">
                <div class="assignee-container task-user-container">
                  <img src="../Assets/cherisher.png" alt="Assignee-profile" class="task-profile-piture">
                  <div class="task-user-info-container">
                    <p class="task-user-role">Assignee</p>
                    <p class="task-user-name">${taskItemValues[0].assigneeName !== '' ? taskItemValues[0].assigneeName : 'Name'}</p>
                  </div>
                </div>
                <div class="task-item-priority">${taskItemValues[0].priorityLevel}</div>
                <div class="reporter-container task-user-container">
                  <img src="../Assets/cherisher.png" alt="reporter-profile" class="task-profile-piture">
                  <div class="task-user-info-container">
                    <p class="task-user-role">Reporter</p>
                    <p class="task-user-name">${taskItemValues[0].reporterName !== '' ? taskItemValues[0].reporterName : 'Name'}</p>
                  </div>
                </div>
                <div class="task-item-date">${taskItemValues[0].dueData}</div>
              </div>
            </li>`
  const index = parseInt(taskItemValues[0].taskStatus)
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
  appendTaskToBoard(taskItemValues)
  htmlComponents.addUpdateTasksOverlay.classList.add('hide-overlay')
  displayAnalyticsData()
})

/**
 *
 */
function createTaskId () {
  let newTaskId = htmlComponents.getTaskIds().length
  newTaskId = padZeroes(newTaskId)
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
