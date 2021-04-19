import {AppState} from "./reducers";
import {calendarLoadingDone, calendarLoadingFail, calendarLoadingStart, displayMessage} from "./actions";

export const loadCalendar = (year: number, month: number) => async (dispatch: any, getState: () => AppState) => {
    try {
        dispatch(calendarLoadingStart());
        setTimeout(() => dispatch(calendarLoadingDone([])), 3000);
    } catch (ex) {
        dispatch(calendarLoadingFail());
        dispatch(displayMessage(ex.toString(), {type: "error"}));
    }
};