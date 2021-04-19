import {toast, ToastOptions} from "react-toastify";

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