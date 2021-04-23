import {toast, ToastOptions} from "react-toastify";
import {DataLog} from "./reducers";

export type myAction = {
    type: string,
    payload: any
}

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const displayMessage = (text: string, options: ToastOptions) => {
    toast(text, options);
    return {
        type: DISPLAY_MESSAGE
    };
}

export const CALENDAR_LOADING_START = 'CALENDAR_LOADING_START';
export const calendarLoadingStart = () => ({
   type: CALENDAR_LOADING_START
});

export const CALENDAR_LOADING_DONE = 'CALENDAR_LOADING_DONE';
export const calendarLoadingDone = (dayLogs: []) => ({
    type: CALENDAR_LOADING_DONE,
    payload: { dayLogs }
});

export const CALENDAR_LOADING_FAIL = 'CALENDAR_LOADING_FAIL';
export const calendarLoadingFail = () => ({
    type: CALENDAR_LOADING_FAIL
});

export const SET_AUTHED = 'SET_AUTHED';
export const setAuthed = () => ({
    type: SET_AUTHED
});

export const SET_UNAUTHED = 'SET_UNAUTHED';
export const setUnauthed = () => ({
    type: SET_UNAUTHED
});

export const START_GENERAL_LOADING = 'START_GENERAL_LOADING';
export const startGeneralLoading = () => ({
    type: START_GENERAL_LOADING
});

export const END_GENERAL_LOADING = 'END_GENERAL_LOADING';
export const endGeneralLoading = () => ({
    type: END_GENERAL_LOADING
});

export const USER_DATA_LOADED = 'USER_DATA_LOADED';
export const userDataLoaded = (userData: any) => ({
    type: USER_DATA_LOADED,
    payload: { userData }
});

export const DATA_LOGS_LOADED = 'DATA_LOGS_LOADED';
export const dataLogsLoaded = (dataLogs: DataLog[]) => ({
    type: DATA_LOGS_LOADED,
    payload: { dataLogs }
});