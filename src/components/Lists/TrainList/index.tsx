import React, { useEffect } from "react";
import TrainListItem from "./TrainListItem";
import { IListValue } from "../../../interfaces";
import List from "../index";
import Loading from "../../Loading";
import { useDispatch } from "react-redux";
import {
	loadMoreTrainStations,
	selectTrainStation,
} from "../../../store/actions/mapExamples";

interface Props {
	stations: IListValue[];
	listError: boolean;
}
let observer: any;
let loadOn: any;

export default function TrainList({ stations, listError }: Props) {
	const dispatch = useDispatch();
	const stationQty = stations.length;

	useEffect(() => {
		const onIntersection = async (entries: any) => {
			if (entries[0].isIntersecting) {
				try {
					await dispatch(loadMoreTrainStations(stationQty));
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
						selectStation={() => dispatch(selectTrainStation(station))}
					/>
				))
			) : (
				<Loading text="trains" />
			)}
		</List>
	);
}
