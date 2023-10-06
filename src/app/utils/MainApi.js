import axios from 'axios'
import { BASE_URL } from '../constants/envConfig'
export class MainApi {
  constructor(config) {
    this._url = config.url
  }

  getTasks(page = 1, filter = 'All') {
    return axios.get(`${this._url}/tasks`, {
      params: {
        page,
        filter,
      },
    })
  }

  postTask({
    name = '<Nameless task>',
    date = new Date().toLocaleString(),
    isDone = false,
  }) {
    return axios.post(`${this._url}/tasks`, {
      name,
      date,
      isDone,
    })
  }

  deleteTask(taskId) {
    return axios.delete(`${this._url}/tasks`, {
      data: { id: taskId },
    })
  }

  updateTask(taskName, taskId) {
    return axios.patch(`${this._url}/tasks`, {
      name: taskName,
      id: taskId,
    })
  }
}
const Api = new MainApi({
  url: BASE_URL,
})
export { Api }
