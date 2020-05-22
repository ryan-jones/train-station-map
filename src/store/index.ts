import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mapExamplesReducer from "./reducers/mapExamples";
import drawerReducer from "./reducers/drawer";
import settingsReducer from "./reducers/settings";

const rootReducer = combineReducers({
	mapExamples: mapExamplesReducer,
	settings: settingsReducer,
	drawer: drawerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
