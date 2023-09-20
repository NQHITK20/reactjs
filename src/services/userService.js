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
const getExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`)
}
const getProfileById = (doctorId) => {
    return axios.get(`/api/get-profile-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}
const getAllDetailSpecialtyByid = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const getAllDetailClinicByid = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}
const sendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {
    handlerLoginApi, getAllUsers, getExtraInfoById, postPatientBookAppointment, getAllPatientForDoctor,
    createUser, deleteUserService, getProfileById, postVerifyBookAppointment, sendRemedy,
    editUserService, getAllcode2, getTopDoctorHome, createNewSpecialty, getAllSpecialty,
    getAllDoctor, saveDetailDoctor, getInfoDoctor, saveBulkSchedule, getScheduleDoctor,
    getAllDetailSpecialtyByid, createNewClinic, getAllClinic, getAllDetailClinicByid
}