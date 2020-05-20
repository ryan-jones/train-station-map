import React, { useReducer, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/Home";
import { DEFAULT_REDUCER, INITIAL_STATE } from "./store";
import StoreContext from "./contexts/store";
import Layout from "./components/Layout/Layout";
import "./App.css";

const Trains = React.lazy(() => import("./containers/Trains"));
const Buses = React.lazy(() => import("./containers/Buses"));
const NotFound = React.lazy(() => import("./containers/NotFound"));

function App() {
	const [state, dispatch] = useReducer(DEFAULT_REDUCER, INITIAL_STATE);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route
						path="/trains"
						render={() => (
							<Suspense fallback={<Layout title="Loading" />}>
								<Trains />
							</Suspense>
						)}
					/>
					<Route
						path="/buses"
						render={() => (
							<Suspense fallback={<Layout title="Loading" />}>
								<Buses />
							</Suspense>
						)}
					/>
					<Route
						render={() => (
							<Suspense fallback={<Layout title="Loading" />}>
								<NotFound />
							</Suspense>
						)}
					/>
				</Switch>
			</BrowserRouter>
		</StoreContext.Provider>
	);
}

export default App;
