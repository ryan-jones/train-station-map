import React, { useRef, useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { IStation } from "../StationsView";
import useMapProps from "../../hooks/useMapProps";
import InfoWindowContent from "./InfoWindowContent";
import { IMarker } from "../../interfaces";
import logo from "../../assets/logo_cff@2x.png";
import "./Map.scss";

interface IMarkerProps {
	station: IStation | null;
	marker: any;
}

interface Props {
	google: any;
	loaded: boolean;
}

const MapContainer = (props: Props) => {
	const { markers, selectedStation } = useMapProps();
	const [mapReady, setMapReady] = useState(false);
	const [infoMarker, setInfoMarker] = useState<IMarkerProps>({
		station: null,
		marker: null,
	});
	const [showInfoWindow, setShowInfoWindow] = useState(false);
	const mapRef = useRef<any>({});
	const markerRef = useRef<any>(null);

	const defaultProps = {
		zoom: 10,
		google: props.google,
		style: {
			width: "100%",
			height: "100%",
		},
		initialCenter: selectedStation.coordinates,
	};

	const onClickMarker = (props: any, marker: any) => {
		setInfoMarker({ station: props, marker });
		setShowInfoWindow(true);
	};

	useEffect(() => {
		if (markerRef.current && mapReady) {
			setInfoMarker({
				station: selectedStation,
				marker: markerRef.current.marker,
			});
			setShowInfoWindow(true);
		}
	}, [mapReady, selectedStation]);

	return (
		<div className="map">
			{props.loaded && (
				<Map ref={mapRef} {...defaultProps} onReady={() => setMapReady(true)}>
					{mapReady &&
						markers.length > 0 &&
						markers.map((marker: IMarker) => (
							<Marker
								ref={marker.name === selectedStation.name ? markerRef : null}
								{...marker}
								onClick={onClickMarker}
							/>
						))}
					{mapReady && infoMarker.station && (
						<InfoWindow
							marker={infoMarker.marker}
							visible={showInfoWindow}
							google={props.google}
							map={mapRef.current}
						>
							<InfoWindowContent station={infoMarker.station} />
						</InfoWindow>
					)}
				</Map>
			)}
			<div className="credit">
				<p>Based on data from</p>
				<img src={logo} alt="credit" />
			</div>
		</div>
	);
};

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_API_KEY || "",
})(MapContainer);
