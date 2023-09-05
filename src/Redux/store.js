import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as ListReducer } from "./AddList/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ ListReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
