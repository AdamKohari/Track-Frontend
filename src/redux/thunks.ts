import {AppState} from "./reducers";
import {calendarLoadingDone, calendarLoadingFail, calendarLoadingStart, displayMessage} from "./actions";

const BACKEND_URL = 'http://track-you.herokuapp.com';

export const loadCalendar = (year: number, month: number) => async (dispatch: any, getState: () => AppState) => {
    try {
        dispatch(calendarLoadingStart());
        setTimeout(() => dispatch(calendarLoadingDone([])), 3000);
    } catch (ex) {
        dispatch(calendarLoadingFail());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export const loginToApp = (username: string, password: string) => async (dispatch: any) => {
    try {
        const url = BACKEND_URL + '/login';
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const respJson = await resp.json();
        if (respJson.status === 'OK') {
            localStorage.setItem('authToken', respJson.authToken);
        } else {
            dispatch(displayMessage(respJson.error,{type: "error"}));
        }
    } catch (ex) {
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};