import React, { useEffect } from "react";
import BusList from "../../components/Lists/BusList";
import { fetchBusRoutes } from "../../utils/http";
import useStore from "../../hooks/useStore";
import { BUS_ROUTES_LOADED, BUS_ROUTES_LOAD_ERROR } from "../../store";
import PageLayout from "../../components/Layout/PageLayout";
import Layout from "../../components/Layout/Layout";

const title = "Looking for a bus in Catalonia?";
const subtitle = "Explore The Dense Network Of Bus Stations around Barcelona! ";

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
		<Layout title={title} subtitle={subtitle}>
			<PageLayout
				page="buses"
				title={title}
				subtitle={subtitle}
				mapReady={Boolean(state.buses.currentRoute.name)}
			>
				<BusList routes={state.buses.routes} listError={state.buses.error} />
			</PageLayout>
		</Layout>
	);
}
