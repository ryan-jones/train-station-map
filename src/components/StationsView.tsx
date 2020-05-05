import React, { useEffect, useState, useReducer } from "react";
import Map from "./Map/Map";
import Stations from "./Stations/Stations";
import Loading from "./Loading";
import { DEFAULT_REDUCER, INITIAL_STATE, STATIONS_LOADED } from "../store";
import { formatStations, fetchStations } from "../utils";
import StoreContext from "../contexts/store";
import logo from "../assets/logo_cff@2x.png";
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
	const [mapLoaded, setMapLoaded] = useState(false);

	const [state, dispatch] = useReducer(DEFAULT_REDUCER, INITIAL_STATE);

	const loadStations = () => {
		fetchStations(0)
			.then((data) => {
				const formattedStations = formatStations(data.records);
				dispatch({ type: STATIONS_LOADED, payload: formattedStations });
			})
			.catch((err) => console.error(err));
	};

	const loadMap = () => {
		const googleScript = document.createElement("script");
		googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`;
		document.body.appendChild(googleScript);
		googleScript.addEventListener("load", () => setMapLoaded(true));
	};

	useEffect(() => {
		loadStations();
		loadMap();
	}, []);

	const mapReady = mapLoaded && state.selectedStation.name;
	const loading = (
		<div className="loading-container">
			<Loading text="map" />
		</div>
	);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<div className="container">
				<div className="map-container">
					{mapReady ? <Map /> : loading}
					<div className="credit">
						<p>Based on data from</p>
						<img src={logo} alt="credit" />
					</div>
				</div>
				<Stations />
			</div>
		</StoreContext.Provider>
	);
}
