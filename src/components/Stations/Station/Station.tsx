import React from "react";
import "./Station.scss";
import useStore from "../../../hooks/useStore";
import { SELECT_STATION } from "../../../store";
import Icons from "../Icons/Icons";

interface IStation {
	name: string;
	address: string;
	email: string;
	service: any;
}

export default function Station(station: any) {
	const { dispatch } = useStore();

	const selectStation = () => {
		dispatch({ type: SELECT_STATION, payload: station });
	};
	return (
		<div className="station" onClick={selectStation}>
			<div className="station__location">
				<h2>{station.name}</h2>
				<p className="station__address">{station.address}</p>
			</div>
			<div className="station__info">
				<Icons station={station} />
				<div className="station__email">
					<p>{station.email}</p>
				</div>
			</div>
		</div>
	);
}
