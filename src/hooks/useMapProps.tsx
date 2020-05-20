import useStore from "./useStore";
import { useMemo } from "react";
import usePage from "./usePage";

export interface ICoordinates {
	lat: number;
	lng: number;
}

export interface IMarker {
	title: string;
	position: ICoordinates;
	key: string;
	id?: number;
}

export interface ICenterProps {
	center: ICoordinates;
	zoom: number;
}

interface Props {
	markers: any[];
	polylineCoords: ICoordinates[];
}

export default function useMapProps() {
	const { state } = useStore();
	const page = usePage();

	const { trains, buses } = state;

	return useMemo(() => {
		const { origin, stops, destination } = buses.currentRoute;
		const trainPoints: any[] = [trains.selectedStation].map((station) => ({
			...station,
			coordinates: { ...station.origin.coordinates },
		}));

		const points: any[] =
			page === "trains" ? trainPoints : [origin, ...stops, destination];

		const { markers, polylineCoords } = points.reduce(
			(mapProps: Props, current: any) => {
				if (current.coordinates.lng && current.coordinates.lat) {
					mapProps.markers.push({
						name: current.name || current.address,
						id: current.id,
						position: current.coordinates,
						key: `${current.coordinates.lat}-${current.coordinates.lng}`,
					});
					mapProps.polylineCoords.push(current.coordinates);
				}
				return mapProps;
			},
			{
				markers: [],
				polylineCoords: [],
			}
		);

		const selectedValue =
			page === "trains" ? trains.selectedStation : buses.currentRoute;
		return { markers, polylineCoords, selectedValue };
	}, [buses.currentRoute, page, trains.selectedStation]);
}
