import axios from 'axios'
const url = process.env.BASE_URL

async function checkToken() {
  try {
    return await axios.get(`${url}/tasks/get`, {
      withCredentials: true,
    })
  } catch (err) {
    return err
  }
}
async function register(name, email, password) {
  return await axios.post(`${url}/register`, {
    withCredentials: true,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
}

async function login(email, password) {
  return await axios.post(`${url}/login`, {
    withCredentials: true,
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

async function getUserData() {
  return await axios.get(`${url}/users/me`, {
    withCredentials: true,
  })
}

async function signOut() {
  return await axios.post(`${url}/signout`, {
    withCredentials: true,
  })
}

export { checkToken, register, login, getUserData, signOut }
