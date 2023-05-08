import axios from "../axios"

const handlerLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

export { handlerLoginApi }