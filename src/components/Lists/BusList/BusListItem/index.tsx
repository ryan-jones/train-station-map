import React from "react";
import useStore from "../../../../hooks/useStore";
import { setStatusIndicator } from "../../../../utils";
import { SELECT_BUS_ROUTE } from "../../../../store";
import { IListValue } from "../../../../interfaces";
import "./ListItem.scss";

interface Props {
	result: IListValue;
}

export default function ListItem({ result }: Props) {
	const { state, dispatch } = useStore();

	const isSelectedRoute = state.buses.currentRoute.name === result.name;
	const itemClass = isSelectedRoute ? "item-selected" : "item";

	return (
		<div
			key={result.name}
			className={itemClass}
			onClick={() => {
				if (!isSelectedRoute) {
					dispatch({ type: SELECT_BUS_ROUTE, payload: result });
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
