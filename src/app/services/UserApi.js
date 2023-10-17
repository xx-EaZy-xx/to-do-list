import axios from 'axios'
const url = process.env.BASE_URL
const instance = axios.create({
  withCredentials: true,
})

async function apiCheckToken() {
  try {
    return await instance.get(`${url}/users/get`)
  } catch (err) {
    return err
  }
}
async function apiRegister(name, email, password, secondPassword) {
  return await instance.post(`${url}/users/register`, {
    name,
    email,
    password,
    secondPassword,
  })
}

async function apiLogin(login, password) {
  return await instance.post(`${url}/users/login`, {
    login: login,
    password: password,
  })
}

async function apiGetUserData() {
  return await instance.get(`${url}/users/me`)
}

async function apiSignOut() {
  return await instance.post(`${url}/users/signout`)
}

export { apiCheckToken, apiRegister, apiLogin, apiGetUserData, apiSignOut }
