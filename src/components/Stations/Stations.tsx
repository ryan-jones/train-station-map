import React, { useEffect } from "react";
import Station from "./Station/Station";
import useStore from "../../hooks/useStore";
import { formatStations, fetchStations } from "../../utils";
import { LOAD_MORE_STATIONS } from "../../store";
import Loading from "../Loading";
import { IStation } from "../StationsView";
import "./Stations.scss";

let observer: any;
let loadOn: any;

export default function Stations() {
	const { state, dispatch } = useStore();
	const stationQty = state.stations.length;

	useEffect(() => {
		const onIntersection = async (entries: any) => {
			if (entries[0].isIntersecting) {
				try {
					const { records } = await fetchStations(stationQty);
					const stations = formatStations(records);
					dispatch({
						type: LOAD_MORE_STATIONS,
						payload: stations,
					});
					observer.unobserve(loadOn);
				} catch (err) {
					console.log(err);
				}
			}
		};
		if (stationQty > 0) {
			const stationList = document.getElementsByClassName("station");
			const loadPoint = Math.floor(stationQty * 0.7);
			loadOn = stationList[loadPoint];
			observer = new IntersectionObserver(onIntersection, {
				threshold: 0.3,
			});
			observer.observe(loadOn);
		}
	}, [dispatch, stationQty]);

	return (
		<div className="stations-container">
			{stationQty > 0 ? (
				state.stations.map((station: IStation) => (
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
