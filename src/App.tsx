import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TrainsPage from "./containers/Trains";
import BusesPage from "./containers/Buses";
import HomePage from "./containers/Home";
import { DEFAULT_REDUCER, INITIAL_STATE } from "./store";
import StoreContext from "./contexts/store";
import NotFoundPage from "./containers/NotFound";
import "./App.css";

function App() {
	const [state, dispatch] = useReducer(DEFAULT_REDUCER, INITIAL_STATE);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/trains" component={TrainsPage} />
					<Route path="/buses" component={BusesPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		</StoreContext.Provider>
	);
}

export default App;
