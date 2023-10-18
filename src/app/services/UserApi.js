import axios from 'axios'
const url = process.env.BASE_URL

async function apiCheckToken() {
  try {
    const userId = localStorage.getItem('userId')
    return await axios.get(`${url}/users/me`, {
      params: {
        userId: userId,
      },
    })
  } catch (err) {
    return err
  }
}
async function apiRegister(login, email, password, secondPassword) {
  return await axios.post(`${url}/users/register`, {
    login,
    email,
    password,
    secondPassword,
  })
}

async function apiLogin(login, password) {
  return await axios.post(`${url}/users/login`, {
    login: login,
    password: password,
  })
}

async function apiGetUserData() {
  return await axios.get(`${url}/users/me`)
}

async function apiSignOut() {
  return await axios.post(`${url}/users/signout`)
}

export { apiCheckToken, apiRegister, apiLogin, apiGetUserData, apiSignOut }
