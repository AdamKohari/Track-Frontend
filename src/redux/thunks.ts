import {AppState} from "./reducers";
import {
    calendarLoadingDone,
    calendarLoadingFail,
    calendarLoadingStart,
    displayMessage, endGeneralLoading,
    setAuthed,
    startGeneralLoading
} from "./actions";

// const BACKEND_URL = 'http://track-you.herokuapp.com';
const BACKEND_URL = 'http://localhost:5000';

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
        dispatch(startGeneralLoading());
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
            localStorage.setItem('username', username);
            dispatch(endGeneralLoading());
            dispatch(setAuthed());
        } else {
            dispatch(endGeneralLoading());
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export const registerToApp = (username: string, password: string) => async (dispatch: any) => {
    try {
        dispatch(startGeneralLoading());
        const url = BACKEND_URL + '/register';
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
            dispatch(displayMessage('Sikeres regisztráció!', {type: "success"}));
            dispatch(endGeneralLoading());
        } else {
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
            dispatch(endGeneralLoading());
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};