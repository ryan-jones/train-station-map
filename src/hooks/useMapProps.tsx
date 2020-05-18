import useStore from "./useStore";
import { useMemo, useCallback } from "react";
import { IStation } from "../interfaces";

export default function useMapProps() {
	const { state } = useStore();

	const { stations, selectedStation } = state;

	const setMarkers = useCallback(() => {
		return stations.map((station: IStation, i: number) => ({
			name: station.name,
			key: `${station.name}-${i}`,
			position: station.coordinates,
			service: station.service,
			address: station.address,
			email: station.email,
		}));
	}, [stations]);

	return useMemo(() => {
		const markers = setMarkers();

		return { markers, selectedStation };
	}, [setMarkers, selectedStation]);
}
