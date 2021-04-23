import {
    calendarLoadingDone,
    calendarLoadingFail,
    calendarLoadingStart, dataLogsLoaded,
    displayMessage, endGeneralLoading,
    setAuthed,
    startGeneralLoading, userDataLoaded
} from "./actions";
import {AppState} from "./reducers";

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

export type userDataJson = {
    isDataType: boolean,
    dataType?: string[],
    mainGoal?: { field: string, initValue: number, value: number, due: string }
}
export const setUserData = (postObj: userDataJson) => async (dispatch: any) => {
    try {
        dispatch(startGeneralLoading());
        const url = BACKEND_URL + '/profileInfo';
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postObj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken') || 'NO_LOGIN'
            }
        });
        const respJson = await resp.json();
        if (respJson.status === 'OK') {
            dispatch(displayMessage('Mentve!', {type: "success"}));
            setTimeout(() => {
                dispatch(getUserData());
            }, 2000);
        } else {
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
            dispatch(endGeneralLoading());
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export const getUserData = () => async (dispatch: any) => {
    try {
        dispatch(startGeneralLoading());
        const url = BACKEND_URL + '/profileInfo';
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
            dispatch(userDataLoaded(respJson.data));
            dispatch(endGeneralLoading());
        } else {
            dispatch(endGeneralLoading());
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export const getDataLogs = () => async (dispatch: any) => {
    try {
        dispatch(startGeneralLoading());
        const url = BACKEND_URL + '/dataLogs';
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
            dispatch(dataLogsLoaded(respJson.data));
            dispatch(endGeneralLoading());
        } else {
            dispatch(endGeneralLoading());
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};

export const setDataLog = (fieldsObject: any) => async (dispatch: any, getState: () => AppState) => {
    const nonEmptyFields: any = {};
    let numOfFields = 0;
    Object.keys(fieldsObject).forEach(key => {
       if (fieldsObject[key] !== '' && key !== 'date') {
           nonEmptyFields[key] = fieldsObject[key];
           numOfFields++;
       }
    });
    if (numOfFields === 0) {
        dispatch(displayMessage('Kérlek adj meg legalább 1 értéket!', {type: "warning"}));
        return;
    }

    try {
        const postJson = {
            date: fieldsObject.date,
            mainField: getState().appRedux.mainGoal.field,
            data: nonEmptyFields
        };

        dispatch(startGeneralLoading());
        const url = BACKEND_URL + '/dataLogs';
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postJson),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken') || 'NO_LOGIN'
            }
        });
        const respJson = await resp.json();
        if (respJson.status === 'OK') {
            dispatch(displayMessage('Adat rögzítve!', {type: "success"}));
            setTimeout(() => {
                dispatch(getUserData());
            }, 2000);
        } else {
            dispatch(displayMessage(JSON.stringify(respJson.error),{type: "error"}));
            dispatch(endGeneralLoading());
        }
    } catch (ex) {
        dispatch(endGeneralLoading());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};