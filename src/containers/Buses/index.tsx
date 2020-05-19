import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import BusList from "../../components/Lists/BusList";
import Map from "../../components/Map";
import { fetchBusRoutes } from "../../utils/http";
import useStore from "../../hooks/useStore";
import { BUS_ROUTES_LOADED, BUS_ROUTES_LOAD_ERROR } from "../../store";
import PageContext from "../../contexts/page";
import "./Buses.scss";

const title = "Explore Bus Routes in Barcelona";
const subtitle = "placeholder for buses";

export default function BusesPage() {
	const { state, dispatch } = useStore();
	useEffect(() => {
		fetchBusRoutes()
			.then((result) => {
				dispatch({
					type: BUS_ROUTES_LOADED,
					payload: result,
				});
			})
			.catch((err) => dispatch({ type: BUS_ROUTES_LOAD_ERROR }));
	}, [dispatch]);
	return (
		<PageContext.Provider value="buses">
			<Layout title={title} subtitle={subtitle}>
				<div className="container">
					<BusList routes={state.buses.routes} listError={state.buses.error} />
					{state.buses.currentRoute.name && (
						<div className="map-wrapper">
							<Map />
						</div>
					)}
				</div>
			</Layout>
		</PageContext.Provider>
	);
}
