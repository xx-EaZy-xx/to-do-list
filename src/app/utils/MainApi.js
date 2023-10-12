import axios from 'axios'
import { BASE_URL } from '../constants/envConfig'
const instance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(
  (response) => response,
  (error) => {
    let errorMessage
    const res = error.request.response
    if (!res) {
      errorMessage = 'No responce'
    }
    if (res === undefined) {
      errorMessage = 'Client side trouble'
    }
    if (error.response) {
      errorMessage = `${error.response.status}: ${error.response.data.message}`
    }
    console.log(errorMessage)
    return error
  }
)

export class MainApi {
  constructor(config) {
    this._url = config.url
  }

  getTasks(page = 1, filter = 'All', sortVector = 'ASC', today = 'any') {
    return instance.get(`${this._url}/tasks/get`, {
      params: {
        page,
        filter,
        sortVector,
        today,
      },
    })
  }

  postTask({
    name = '<Nameless task>',
    date = new Date().toLocaleString(),
    partialDate = new Date().toLocaleString().slice(0, 10),
  }) {
    return instance.post(`${this._url}/tasks/post`, {
      name,
      date,
      partialDate,
    })
  }

  deleteTask(taskId) {
    return instance.delete(`${this._url}/tasks/delete`, {
      data: { id: taskId },
    })
  }

  updateTask({ taskName, taskId }) {
    if (taskName) {
      return instance.patch(`${this._url}/tasks/patch`, {
        name: taskName,
        id: taskId,
      })
    } else {
      return instance.patch(`${this._url}/tasks/patch`, {
        id: taskId,
      })
    }
  }
}
const Api = new MainApi({
  url: BASE_URL,
})
export { Api }
