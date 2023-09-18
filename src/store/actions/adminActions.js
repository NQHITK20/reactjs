import actionTypes from './actionTypes';
import {
    getAllcode2, createUser, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHome,
    getAllDoctor, saveDetailDoctor, getAllSpecialty, getAllClinic
} from '../../services/userService';
import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllcode2('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            console.log('fetch arr faike', e);
            dispatch(fetchGenderFailed())
        }
    }

}
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode2('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            console.log('fetch posi faike', e);
            dispatch(fetchPositionFailed())
        }
    }

}
export const createNewUSer = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUser(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("TẠO THÀNH CÔNG 1 CHÁU");
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed())
        }
    }
}
export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})



export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcode2("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log('fetch Role faike', e);
            dispatch(fetchRoleFailed())
        }
    }

}
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
//start doing end



export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            let res1 = await getTopDoctorHome(3)
            console.log('check top doctor', res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
                toast.error("BUG FETCH");
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            toast.error("BUG FETCH");

        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILED',
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("ISEKAI THÀNH CÔNG 1 CHÁU");
            } else {
                toast.error("ISEKAI HỤT 1 CHÁU");
                dispatch(deleteUserSuccess());
            }
        } catch (e) {
            toast.error("ISEKAI HỤT 1 CHÁU");
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update THÀNH CÔNG 1 CHÁU");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update HỤT 1 CHÁU");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update HỤT 1 CHÁU");
            dispatch(editUserFailed())
            console.log("edit user failed err", e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED', error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('fetch all doctor failed', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
                toast.success("Save THÀNH CÔNG 1 CHÁU");
            } else {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
                toast.error("Save No THÀNH CÔNG 1 CHÁU");
            }
        } catch (e) {
            console.log('save doctor failed', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
            toast.error("Save No THÀNH CÔNG 1 CHÁU");
        }
    }
}

export const fetchAllScheduleHourDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode2("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED,
                })
            }
        } catch (e) {
            console.log('fetch all doctor schedule hour failed', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START, })

            let resPrice = await getAllcode2("PRICE");
            let resPayment = await getAllcode2("PAYMENT");
            let resProvince = await getAllcode2("PROVINCE");
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                toast.error("fetchRequiredDoctorInfo HỤT 1 CHÁU");
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (e) {
            toast.error("Update HỤT 1 CHÁU");
            dispatch(fetchRequiredDoctorInfoFailed())
            console.log("edit user failed err", e)
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: data
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
})