import React from "react";
import Icons from "../../../Icons/Icons";
import { IListValue } from "../../../../interfaces";
import "./TrainListItem.scss";

interface Props {
	station: IListValue;
	selectStation: () => void;
}

export default function TrainListItem({ station, selectStation }: Props) {
	return (
		<div className="station" onClick={selectStation}>
			<div className="station__location">
				<h2>{station.name}</h2>
				<p className="station__address">{station.origin.address}</p>
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
