import axios from "../axios"

const handlerLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createUser = (data) => {
    console.log('check data from service :', data)
    return axios.post('/api/create-new-user', data)
}
export { handlerLoginApi, getAllUsers, createUser }