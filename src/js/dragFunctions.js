import { postStatusIndex } from './apiFunctions.js'
import { taskLists, getTotalTaskItems } from './htmlComponents.js'
import { displayAnalyticsData } from './owner.js'

/**
 *
 */
export function drag () {
  let dragged = null

  const handleCard = () => {
    const taskItems = getTotalTaskItems()

    taskItems.forEach((taskItem) => {
      taskItem.addEventListener('dragstart', (e) => {
        dragged = e.target
      })
    })
  }

  const handleDropZone = () => {
    const taskLists = document.querySelectorAll('.task-list')

    taskLists.forEach((taskList) => {
      taskList.addEventListener('dragover', (e) => {
        e.preventDefault()
      })

      taskList.addEventListener('drop', (e) => {
        e.preventDefault()

        const prevZone = dragged.parentNode
        const nextZone = e.target.closest('.task-list')

        if (prevZone.id !== nextZone.id) {
          prevZone.removeChild(dragged)
          nextZone.append(dragged)
          const statusIndex = getStatusIndex(nextZone).toString()
          const draggedId = (dragged.querySelector('.task-item-id').innerHTML).split(' ')[1]
          postStatusIndex(draggedId, statusIndex)
          displayAnalyticsData()
        }
      })
    })
  }

  (() => {
    handleCard()
    handleDropZone()
  })()
}

/**
 *
 * @param comparedItem
 */
export function getStatusIndex (comparedItem) {
  let result
  taskLists.forEach((element, index) => {
    if (element === comparedItem) {
      result = index
    }
  })
  return result
}
