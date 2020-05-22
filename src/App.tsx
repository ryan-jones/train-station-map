import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import store from "./store";
import BaseLayout from "./components/Layout/BaseLayout";
import Loading from "./components/Loading";
import { Provider } from "react-redux";

const Trains = React.lazy(() => import("./pages/MapExamples/Trains"));
const Buses = React.lazy(() => import("./pages/MapExamples/Buses"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<BaseLayout>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route
							path="/maps/trains"
							render={() => (
								<Suspense fallback={<Loading text="page" />}>
									<Trains />
								</Suspense>
							)}
						/>
						<Route
							path="/maps/buses"
							render={() => (
								<Suspense fallback={<Loading text="page" />}>
									<Buses />
								</Suspense>
							)}
						/>
						<Route
							render={() => (
								<Suspense fallback={<Loading text="page" />}>
									<NotFound />
								</Suspense>
							)}
						/>
					</Switch>
				</BaseLayout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
