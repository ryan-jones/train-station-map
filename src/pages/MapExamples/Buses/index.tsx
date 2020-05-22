import React, { useEffect } from "react";
import BusList from "../../../components/Lists/BusList";
import MapPageLayout from "../../../components/Layout/MapPageLayout";
import useText from "../../../hooks/useText";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../../../store/actions/mapExamples";

export default function BusesPage() {
	const { buses } = useSelector((state: any) => state.mapExamples);
	const dispatch = useDispatch();
	const text = useText();
	useEffect(() => {
		dispatch(fetchBuses());
	}, [dispatch]);
	return (
		<MapPageLayout
			page="buses"
			title={text.buses.title}
			subtitle={text.buses.subtitle}
			mapReady={Boolean(buses.currentRoute.name)}
		>
			<BusList routes={buses.routes} listError={buses.error} />
		</MapPageLayout>
	);
}
