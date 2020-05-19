import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import useStore from "../../hooks/useStore";
import { fetchStations } from "../../utils/http";
import { TRAIN_STATIONS_LOADED, TRAIN_STATIONS_LOAD_ERROR } from "../../store";
import Map from "../../components/Map";
import TrainList from "../../components/Lists/TrainList";
import PageContext from "../../contexts/page";
import { formatTrainStations } from "../../utils/formatters";
import { IListValue } from "../../interfaces";
import "./Trains.scss";

const title = "Explore Swiss Railway Stations";
const subtitle =
	"An Interactive Map That Lets You Explore The Dense Network Of Railway Stations in Switzerland";

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
		<PageContext.Provider value="trains">
			<Layout title={title} subtitle={subtitle}>
				<div className="container">
					<TrainList
						stations={state.trains.stations}
						listError={state.trains.error}
					/>
					{state.trains.selectedStation.name && (
						<div className="map-wrapper">
							<Map />
						</div>
					)}
				</div>
			</Layout>
		</PageContext.Provider>
	);
}
