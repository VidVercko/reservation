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
            dispatch(getCompanies());
        }).catch((_) => {
            dispatch({ type: TYPE.USER_LOGIN_FAIL });
            toast.warning("Login failed");
        });
    }
}

export const getCurrentUser = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.USER_GET_START });
        apiRequest({
            url: '/users/current/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            dispatch({ type: TYPE.USER_GET_SUCCESS, payload: { profile: res } });
            toast.success('Login success');
            if (res?.is_company) {
                dispatch(getManagementLocations());
            }
        }).catch((_) => {
            dispatch({ type: TYPE.USER_GET_FAIL });
            toast.warning("Failed to get current user");
        });
    };
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: TYPE.USER_LOGOUT });
    }
}

export const userRegister = ({}) => {
    return (dispatch) => {
        dispatch({ type: USER_REGISTER_START });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: { jwt: 'fake-jwt', user: { name: 'lorem ipsum' } } });
    }
}