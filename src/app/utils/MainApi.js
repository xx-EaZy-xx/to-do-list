import axios from 'axios'
import { BASE_URL } from '../constants/envConfig'

export class MainApi {
  constructor(config) {
    this._url = config.url
  }

  async getTasks(page = 1, filter = 'All', sortVector = 'ASC', today = 'any') {
    try {
      return await axios.get(`${this._url}/tasks/get`, {
        params: {
          page,
          filter,
          sortVector,
          today,
        },
      })
    } catch (err) {
      console.log('Get error:', err.message, err.code)
      return err
    }
  }

  async postTask({
    name = '<Nameless task>',
    date = new Date().toLocaleString(),
    partialDate = new Date().toLocaleString().slice(0, 10),
  }) {
    try {
      return await axios.post(`${this._url}/tasks/post`, {
        name,
        date,
        partialDate,
      })
    } catch (err) {
      return err
    }
  }

  async deleteTask(taskId) {
    try {
      return await axios.delete(`${this._url}/tasks/delete`, {
        data: { id: taskId },
      })
    } catch (err) {
      console.log('Delete error:', err.message, err.code)
      return err
    }
  }

  async updateTask({ taskName, taskId }) {
    try {
      if (taskName) {
        return await axios.patch(`${this._url}/tasks/patch`, {
          name: taskName,
          id: taskId,
        })
      } else {
        return await axios.patch(`${this._url}/tasks/patch`, {
          id: taskId,
        })
      }
    } catch (err) {
      console.log('Patch error:', err.message, err.code)
      return err
    }
  }
}
const Api = new MainApi({
  url: BASE_URL,
})
export { Api }
