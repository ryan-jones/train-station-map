import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainList from "../../../components/Lists/TrainList";
import PageLayout from "../../../components/Layout/MapPageLayout";
import useText from "../../../hooks/useText";
import { fetchTrainStations } from "../../../store/actions/mapExamples";

export default function TrainsPage() {
	const dispatch = useDispatch();
	const { trains } = useSelector((state: any) => state.mapExamples);
	const text = useText();

	useEffect(() => {
		dispatch(fetchTrainStations(0));
	}, [dispatch]);

	return (
		<PageLayout
			page="trains"
			title={text.trains.title}
			subtitle={text.trains.subtitle}
			mapReady={Boolean(trains.selectedStation.name)}
		>
			<TrainList stations={trains.stations} listError={trains.error} />
		</PageLayout>
	);
}
