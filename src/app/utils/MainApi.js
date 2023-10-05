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

  postTask({ name = 'xero1', date = '03.10.2023', isDone = false }) {
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
  //    Примеры запросов к Api:
  //
  //    Api.getTasks().then((res) => console.log(res.data))
  //    Api.postTask({ name: 'zazz', date: '01.01.2001', isDone: false }).then(
  //      (res) => console.log(res.data)
  //    )
  //    Api.deleteTask(7).then((res) => console.log(res.data))
  //    Api.updateTask('one', 1).then((res) => console.log(res.data))
}
const Api = new MainApi({
  url: BASE_URL,
})
export { Api }
