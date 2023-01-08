import * as TYPE from '../store/types';
import * as toast from './mobileToast';
import { asFormData, apiRequest } from './helper';
import { getCompanies } from './common';

export const userLogin = ({ username, password }) => {
    return async (dispatch) => {
        dispatch({ type: TYPE.USER_LOGIN_START });
        apiRequest({
            url: '/auth/token/',
            body: asFormData({ username, password }),
            method: 'POST',
        }).then((res) => {
            dispatch({ type: TYPE.USER_LOGIN_SUCCESS, payload: { accessToken: res?.access, refreshToken: res?.refresh } });
            dispatch(getCurrentUser());
        }).catch((_) => {
            dispatch({ type: TYPE.USER_LOGIN_FAIL });
            toast.showMsg("Login failed");
        });
    }
}

export const userRegister = ({ username, email, password, first_name, last_name }) => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_REGISTER_START });
        apiRequest({
            url: '/auth/register/',
            body: asFormData({ username, email, password, first_name, last_name }),
            method: 'POST',
            okStatus: 201
        }).then((_) => {
            dispatch({ type: TYPE.USER_REGISTER_SUCCESS });
            dispatch(userLogin({ username, password }));
        }).catch((_) => {
            dispatch({ type: TYPE.USER_REGISTER_FAIL });
            toast.showMsg;("Register failed");
        });
    }
}

export const updateProfile = ({ id, phone, bio, location, birth_date }) => {
    return (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.USER_PROFILE_UPDATE_START });
        apiRequest({
            url: `/users/${id}/`,
            body: asFormData({ phone, bio, location, birth_date }),
            method: 'PATCH',
            token: accessToken
        }).then((_) => {
            dispatch({
                type: TYPE.USER_PROFILE_UPDATE_SUCCESS,
                payload: {
                    profile: { id, phone, bio, location, birth_date }
                }
            });
            toast.showMsg("Profile update was successful");
        }).catch((_) => {
            dispatch({ type: TYPE.USER_PROFILE_UPDATE_FAIL });
            toast.showMsg("Failed to update profile");
        });
    }
}

export const getCurrentUser = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        console.log(getState());
        dispatch({ type: TYPE.USER_GET_START });
        apiRequest({
            url: '/users/current/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            if (res?.is_company) {
                toast.showMsg('mobile app is not for companies');
                dispatch({ type: TYPE.USER_GET_FAIL });
            }
            else {
                dispatch({ type: TYPE.USER_GET_SUCCESS, payload: { profile: res } });
                toast.showMsg('Login success');
            }
        }).catch((_) => {
            dispatch({ type: TYPE.USER_GET_FAIL });
            toast.showMsg("Failed to get current user");
        });
    };
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_LOGOUT });
    }
}
