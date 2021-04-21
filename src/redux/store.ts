import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {appRedux, calendar} from "./reducers";

const reducers = {
    calendar,
    appRedux
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