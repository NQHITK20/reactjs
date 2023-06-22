import actionTypes from './actionTypes';
import { getAllcode2, createUser, getAllUsers } from '../../services/userService';


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
            console.log('check create user', res)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
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
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetch All users failed', e);
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