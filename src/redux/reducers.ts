import {
    CALENDAR_LOADING_DONE,
    CALENDAR_LOADING_FAIL,
    CALENDAR_LOADING_START, END_GENERAL_LOADING,
    myAction,
    SET_AUTHED, SET_UNAUTHED,
    START_GENERAL_LOADING, USER_DATA_LOADED
} from "./actions";
import {DayLog} from "../components/progress-calendar/ProgressCalendar";

export type AppState = {
    appRedux: {
        authed: boolean,
        generalLoading: boolean,
        trackedFields: string[],
        mainGoal: {
            field: string,
            value: number,
            due: string
        },
        latestMainData: {
            date: string,
            value: number
        },
        goalStart: string
    }
    calendar: {
        dayLogs: DayLog[],
        isLoading: boolean
    }
}

const app_init = {
    authed: false,
    generalLoading: false,
    trackedFields: [],
    mainGoal: {
        field: '',
        value: 0,
        due: ''
    },
    latestMainData: {
        date: '',
        value: 0
    },
    goalStart: ''
}

export const appRedux = (state = app_init, action: myAction) => {
    const {type, payload} = action;

    switch (type) {
        case SET_AUTHED: {
            return {
                ...state,
                authed: true
            };
        }
        case SET_UNAUTHED: {
            return {
                ...state,
                authed: false
            };
        }
        case START_GENERAL_LOADING: {
            return  {
                ...state,
                generalLoading: true
            };
        }
        case END_GENERAL_LOADING: {
            return {
                ...state,
                generalLoading: false
            };
        }
        case USER_DATA_LOADED: {
            const { userData } = payload;
            return {
                ...state,
                ...userData
            };
        }
        default: {
            return state;
        }
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