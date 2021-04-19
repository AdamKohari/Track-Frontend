import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {calendar} from "./reducers";

const reducers = {
    calendar
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );
}