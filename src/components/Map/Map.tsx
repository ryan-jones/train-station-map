import React, { useEffect, useRef } from "react";
import "./Map.scss";
import useStore from "../../hooks/useStore";
import { setIcons } from "../../utils";
import { IStation } from "../StationsView";
import luggageIcon from "../../assets/luggage.svg";
import loungeIcon from "../../assets/lounge.svg";
import moneyExchangeIcon from "../../assets/money.svg";

declare global {
	interface Window {
		google: any;
		map: any;
	}
}
window.google = window.google || {};
window.map = window.map || {};
let map: any;
let infowindow: any;
const markers: any[] = [];

const icons: any = {
	luggageIcon,
	loungeIcon,
	moneyExchangeIcon,
};

export default function Map() {
	const { state } = useStore();
	const rendered = useRef(false);

	const buildInfoWindowContent = (station: IStation) => {
		const offeredIcons = setIcons(station)
			.map((icon: string, i: number) => {
				return `<img key={${i}-${icon}} src="${icons[icon]}" alt="icon" />`;
			})
			.join("");
		return `
		<div class="info-window">
			<div class="info-window-location">
				<h2>${station.name}</h2>
				<p>${station.address}</p>
				<div class="info-window-details">
					<p>${station.email}</p>
					${offeredIcons}
				</div>
			</div>
		</div>
		`;
	};

	const setInfoWindow = (station: IStation, marker: any) => {
		if (infowindow) {
			infowindow.close();
		}
		infowindow = new window.google.maps.InfoWindow();
		infowindow.setContent(buildInfoWindowContent(station));
		infowindow.open(map, marker);
	};

	useEffect(() => {
		if (!rendered.current) {
			map = new window.google.maps.Map(document.getElementById("map"), {
				center: {
					lat: state.selectedStation.coordinates.lat,
					lng: state.selectedStation.coordinates.lng,
				},
				zoom: 14,
			});

			state.stations.forEach((station: IStation) => {
				const marker = new window.google.maps.Marker({
					map,
					position: station.coordinates,
				});
				marker.addListener("click", () => setInfoWindow(station, marker));
				markers.push(marker);
			});
			window.map = map;
			rendered.current = true;
		}
		return () => {
			delete window.map;
		};
	});

	useEffect(() => {
		const selectedMarker = markers.find((marker) => {
			const { lat, lng } = state.selectedStation.coordinates;
			return marker.position.lat() === lat && marker.position.lng() === lng;
		});
		setInfoWindow(state.selectedStation, selectedMarker);
	}, [state]);

	return <div id="map"></div>;
}
