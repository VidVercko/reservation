import * as TYPE from '../store/types';
import * as toast from './mobileToast';
import { apiRequest, asFormData } from './helper';

export const getReservations = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_GET_RESERVATIONS_START });
        apiRequest({
            url: '/reservations/',
            method: 'GET',
            token: accessToken
        }).then((res) => {
            console.log(res);
            dispatch({
                type: TYPE.COMMON_GET_RESERVATIONS_SUCCESS,
                payload: { reservations: res?.results ?? [] }
            });
        }).catch((_) => {
            dispatch({ type: TYPE.COMMON_GET_RESERVATIONS_FAIL });
        });
    };
}

export const makeReservation = ({ schedule, date }, callback) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_CREATE_RESERVATION_START });
        apiRequest({
            url: '/reservations/',
            body: asFormData({ schedule, date }),
            method: 'POST',
            token: accessToken
        }).then((_) => {
            toast.showMsg('Reservation was made!');
            dispatch({ type: TYPE.COMMON_CREATE_RESERVATION_SUCCESS });
            callback();
        }).catch((_) => {
            toast.showMsg('Failed to make the reservation!');
            dispatch({ type: TYPE.COMMON_CREATE_RESERVATION_FAIL });
        });
    }
}

export const cancelReservation = (id, callback) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().user;
        dispatch({ type: TYPE.COMMON_DELETE_RESERVATION_START });
        apiRequest({
            url: `/reservations/${id}/`,
            method: 'DELETE',
            token: accessToken
        }).then((_) => {
            toast.showMsg('Reservation was canceled!');
            dispatch({ type: TYPE.COMMON_DELETE_RESERVATION_SUCCESS });
            callback();
        }).catch((_) => {
            toast.showMsg('Failed to cancel the reservation!');
            dispatch({ type: TYPE.COMMON_DELETE_RESERVATION_FAIL });
        });
    }
}