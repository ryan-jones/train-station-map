import React, { useEffect, useReducer } from "react";
import Map from "./Map/Map";
import Stations from "./Stations/Stations";
import { DEFAULT_REDUCER, INITIAL_STATE, STATIONS_LOADED } from "../store";
import { formatStations } from "../utils";
import StoreContext from "../contexts/store";
import { fetchStations } from "../utils/http";
import "./StationsView.scss";

export interface IStation {
	coordinates: {
		lat: string;
		lng: string;
	};
	name: string;
	email: string;
	address: string;
	service: string;
}

export default function StationsView() {
	const [state, dispatch] = useReducer(DEFAULT_REDUCER, INITIAL_STATE);

	const loadStations = () => {
		fetchStations(0)
			.then((data) => {
				const formattedStations: IStation[] = formatStations(data.records);
				dispatch({ type: STATIONS_LOADED, payload: formattedStations });
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		loadStations();
	}, []);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<div className="container">
				{state.selectedStation.name && <Map />}
				<Stations />
			</div>
		</StoreContext.Provider>
	);
}
