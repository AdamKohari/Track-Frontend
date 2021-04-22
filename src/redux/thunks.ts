import {
    calendarLoadingDone,
    calendarLoadingFail,
    calendarLoadingStart,
    displayMessage, endGeneralLoading,
    setAuthed,
    startGeneralLoading
} from "./actions";

const BACKEND_URL = 'http://track-you.herokuapp.com';
// const BACKEND_URL = 'http://localhost:5000';

export const loadCalendar = (year: number, month: number) => async (dispatch: any) => {
    try {
        dispatch(calendarLoadingStart());
        const url = BACKEND_URL + `/calendar?year=${year}&month=${month}`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken') || 'NO_LOGIN'
            }
        });
        const respJson = await resp.json();
        if (respJson.status === 'OK') {
            dispatch(calendarLoadingDone(respJson.data));
        } else {
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
        }
    } catch (ex) {
        dispatch(calendarLoadingFail());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export type CalendarEventJson = { year: number, month: number, day: number, selected: string[] };
export const setCalendar = (calendarEvent: CalendarEventJson) => async (dispatch: any) => {
    try {
        const url = BACKEND_URL + '/calendar';
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(calendarEvent),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken') || 'NO_LOGIN'
            }
        });
        const respJson = await resp.json();
        if (respJson.status === 'OK') {
            dispatch(displayMessage('Sikeres hozzáadás!', {type: "success"}));
        } else {
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
        }
    } catch(ex) {
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