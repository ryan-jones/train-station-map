import React, { useEffect } from "react";
import Station from "./Station/Station";
import "./Stations.scss";
import useStore from "../../hooks/useStore";
import { formatStations, fetchStations } from "../../utils";
import { LOAD_MORE_STATIONS } from "../../store";
import Loading from "../Loading";

let observer: any;
let loadOn: any;

export default function Stations() {
	const { state, dispatch } = useStore();
	const stationQty = state.stations.length;

	const onIntersection = (entries: any) => {
		if (entries[0].isIntersecting) {
			fetchStations(state.stations.length)
				.then(({ records }) => {
					const stations = formatStations(records);
					dispatch({
						type: LOAD_MORE_STATIONS,
						payload: stations,
					});
					observer.unobserve(loadOn);
				})
				.catch((err) => console.error(err));
		}
	};

	useEffect(() => {
		if (stationQty > 0) {
			const stationList = document.getElementsByClassName("station");
			const loadPoint = Math.floor(stationQty * 0.7);
			loadOn = stationList[loadPoint];
			observer = new IntersectionObserver(onIntersection, {
				threshold: 0.3,
			});
			observer.observe(loadOn);
		}
	}, [stationQty]);

	return (
		<div className="stations-container">
			{stationQty > 0 ? (
				state.stations.map((station: any) => (
					<div key={`${station.name}-${Math.random()}`}>
						<Station {...station} />
					</div>
				))
			) : (
				<Loading text="stations" />
			)}
		</div>
	);
}
