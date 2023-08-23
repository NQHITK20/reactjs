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
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getAllcode2 = (type) => {
    return axios.get(`/api/allcode?type=${type}`)

}
const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data)
}
const getInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${id}`)
}
const saveBulkSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctor = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`)
}

export {
    handlerLoginApi, getAllUsers,
    createUser, deleteUserService,
    editUserService, getAllcode2, getTopDoctorHome,
    getAllDoctor, saveDetailDoctor, getInfoDoctor, saveBulkSchedule, getScheduleDoctor
}