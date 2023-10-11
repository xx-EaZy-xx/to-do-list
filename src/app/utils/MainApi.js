import axios from 'axios'
import { BASE_URL } from '../constants/envConfig'
export class MainApi {
  constructor(config) {
    this._url = config.url
  }

  getTasks(page = 1, filter = 'All', sortVector = 'ASC', today = 'any') {
    return axios.get(`${this._url}/tasks/get`, {
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
    return axios.post(`${this._url}/tasks/post`, {
      name,
      date,
      partialDate,
    })
  }

  deleteTask(taskId) {
    return axios.delete(`${this._url}/tasks/delete`, {
      data: { id: taskId },
    })
  }

  updateTask({ taskName, taskId }) {
    if (taskName) {
      return axios.patch(`${this._url}/tasks/patch`, {
        name: taskName,
        id: taskId,
      })
    } else {
      return axios.patch(`${this._url}/tasks/patch`, {
        id: taskId,
      })
    }
  }
}
const Api = new MainApi({
  url: BASE_URL,
})
export { Api }
