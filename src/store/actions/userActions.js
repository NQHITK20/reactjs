import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginLotkhe = (userInfo) => ({
    userInfo: userInfo,
    type: actionTypes.USER_LOGIN_SUCCESS,
})
export const adminLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})