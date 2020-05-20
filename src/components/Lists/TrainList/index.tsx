import React, { useEffect } from "react";
import useStore from "../../../hooks/useStore";
import { fetchStations } from "../../../utils/http";
import { formatTrainStations } from "../../../utils/formatters";
import { LOAD_MORE_TRAIN_STATIONS, SELECT_TRAIN_STATION } from "../../../store";
import TrainListItem from "./TrainListItem";
import { IListValue } from "../../../interfaces";
import List from "../index";
import Loading from "../../Loading";

interface Props {
	stations: IListValue[];
	listError: boolean;
}
let observer: any;
let loadOn: any;

export default function TrainList({ stations, listError }: Props) {
	const { dispatch } = useStore();
	const stationQty = stations.length;

	useEffect(() => {
		const onIntersection = async (entries: any) => {
			if (entries[0].isIntersecting) {
				try {
					const { records } = await fetchStations(stationQty);
					const newStations = formatTrainStations(records);
					dispatch({
						type: LOAD_MORE_TRAIN_STATIONS,
						payload: newStations,
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
		<List listError={listError}>
			{stations.length > 0 ? (
				stations.map((station: IListValue, i: number) => (
					<TrainListItem
						key={`${station.name}-${i}`}
						station={station}
						selectStation={() =>
							dispatch({ type: SELECT_TRAIN_STATION, payload: station })
						}
					/>
				))
			) : (
				<Loading text="trains" />
			)}
		</List>
	);
}
