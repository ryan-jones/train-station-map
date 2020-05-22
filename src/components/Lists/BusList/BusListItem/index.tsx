import React from "react";
import { setStatusIndicator } from "../../../../utils";
import { IListValue } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectBusRoute } from "../../../../store/actions/mapExamples";
import "./ListItem.scss";

interface Props {
	result: IListValue;
}

export default function ListItem({ result }: Props) {
	const dispatch = useDispatch();
	const { buses } = useSelector((state: any) => state.mapExamples);

	const isSelectedRoute = buses.currentRoute.name === result.name;
	const itemClass = isSelectedRoute ? "item-selected" : "item";

	return (
		<div
			key={result.name}
			className={itemClass}
			onClick={() => {
				if (!isSelectedRoute) {
					dispatch(selectBusRoute(result));
				}
			}}
		>
			<div className="name">
				<div className="name__header">
					<h2>{result.name}</h2>
				</div>
				<div className="name__status">
					<p>
						status:{" "}
						<span style={{ color: setStatusIndicator(result.status) }}>
							{result.status}
						</span>
					</p>
				</div>
			</div>
			<div className="details">
				<div className="details__route">
					<p>
						<strong>starting from:</strong> {result.origin.address}
					</p>
					{result.destination && (
						<p>
							<strong>ending at:</strong> {result.destination.address}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
