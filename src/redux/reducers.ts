import {CALENDAR_LOADING_DONE, CALENDAR_LOADING_FAIL, CALENDAR_LOADING_START, myAction} from "./actions";
import {DayLog} from "../components/progress-calendar/ProgressCalendar";

export type AppState = {
    calendar: {
        dayLogs: DayLog[],
        isLoading: boolean
    }
}

const calendar_init = {
    dayLogs: [],
    isLoading: false
};

export const calendar = (state = calendar_init, action: myAction) => {
    const {type, payload} = action;

    switch (type) {
        case CALENDAR_LOADING_START: {
            return {
                ...state,
                isLoading: true
            };
        }
        case CALENDAR_LOADING_DONE: {
            const { dayLogs } = payload;
            return {
                ...state,
                isLoading: false,
                dayLogs: dayLogs
            };
        }
        case CALENDAR_LOADING_FAIL: {
            return {
                ...state,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}