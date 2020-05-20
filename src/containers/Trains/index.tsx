import React, { useEffect } from "react";
import useStore from "../../hooks/useStore";
import { fetchStations } from "../../utils/http";
import { TRAIN_STATIONS_LOADED, TRAIN_STATIONS_LOAD_ERROR } from "../../store";
import TrainList from "../../components/Lists/TrainList";
import { formatTrainStations } from "../../utils/formatters";
import { IListValue } from "../../interfaces";
import PageLayout from "../../components/Layout/PageLayout";
import Layout from "../../components/Layout/Layout";

const title = "Looking for a train in Switzerland?";
const subtitle =
	"Explore The Dense Network Of Railway Stations in Switzerland!";

export default function TrainsPage() {
	const { state, dispatch } = useStore();

	useEffect(() => {
		fetchStations(0)
			.then((data) => {
				const formattedStations: IListValue[] = formatTrainStations(
					data.records
				);
				dispatch({ type: TRAIN_STATIONS_LOADED, payload: formattedStations });
			})
			.catch((err) => dispatch({ type: TRAIN_STATIONS_LOAD_ERROR }));
	}, [dispatch]);

	return (
		<Layout title={title} subtitle={subtitle}>
			<PageLayout
				page="trains"
				title={title}
				subtitle={subtitle}
				mapReady={Boolean(state.trains.selectedStation.name)}
			>
				<TrainList
					stations={state.trains.stations}
					listError={state.trains.error}
				/>
			</PageLayout>
		</Layout>
	);
}
