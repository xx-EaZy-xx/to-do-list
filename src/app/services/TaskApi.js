import axios from 'axios'
const url = process.env.BASE_URL

async function getTasks(
  page = 1,
  filter = 'All',
  sortVector = 'ASC',
  today = 'any',
  userId = localStorage.getItem('userId')
) {
  try {
    const tasks = await axios.get(`${url}/tasks/get`, {
      params: {
        page,
        filter,
        sortVector,
        today,
        userId,
      },
    })
    if (tasks) {
      return tasks
    } else {
      return
    }
  } catch (err) {
    console.log('Get error:', err.message, "Tasks aren't found")
  }
}

async function postTask({
  name = '<Nameless task>',
  date = new Date().toLocaleString(),
  partialDate = new Date().toLocaleString().slice(0, 10),
  userId = localStorage.getItem('userId'),
}) {
  try {
    return await axios.post(`${url}/tasks/post`, {
      name,
      date,
      partialDate,
      userId,
    })
  } catch (err) {
    return err
  }
}

async function eraseTask(taskId) {
  try {
    return await axios.delete(`${url}/tasks/delete`, {
      data: { id: taskId },
    })
  } catch (err) {
    console.log('Delete error:', err.message, err.code)
    return err
  }
}

async function updateTask({ taskName, taskId }) {
  try {
    if (taskName) {
      return await axios.patch(`${url}/tasks/patch`, {
        name: taskName,
        id: taskId,
      })
    } else {
      return await axios.patch(`${url}/tasks/patch`, {
        id: taskId,
      })
    }
  } catch (err) {
    console.log('Patch error:', err.message, err.code)
    return err
  }
}

export { getTasks, postTask, eraseTask, updateTask }
