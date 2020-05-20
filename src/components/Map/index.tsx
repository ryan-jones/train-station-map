import React, { useRef, useState, useEffect } from "react";
import {
	Map,
	GoogleApiWrapper,
	Marker,
	InfoWindow,
	Polyline,
} from "google-maps-react";
import useMapProps from "../../hooks/useMapProps";
import InfoWindowContent from "./InfoWindowContent";
import { IMarker } from "../../interfaces";
import { setStatusIndicator } from "../../utils";
import { fetchStopData } from "../../utils/http";
import { formatMarkerProps } from "../../utils/formatters";
import "./Map.scss";
import Loading from "../Loading";

interface IMarkerProps {
	content: any;
	marker: any;
}

interface Props {
	google: any;
	loaded: boolean;
}

const MapContainer = (props: Props) => {
	const { markers, polylineCoords, selectedValue } = useMapProps();
	const [showInfoWindow, setShowInfoWindow] = useState(false);
	const [infoMarker, setInfoMarker] = useState<IMarkerProps>({
		content: null,
		marker: null,
	});
	const mapRef = useRef<any>({});
	const markerRef = useRef<any>(null);

	const defaultProps = {
		zoom: 10,
		google: props.google,
		style: {
			width: "100%",
			height: "100%",
		},
		initialCenter: selectedValue.origin.coordinates,
		center: selectedValue.origin.coordinates,
		containerStyle: {
			width: "inherit",
			position: "relative",
		},
	};

	const onClickMarker = async (props: any, marker: any) => {
		const result = props.id ? await fetchStopData(props.id) : props;
		const formattedMarker = formatMarkerProps(result);
		setInfoMarker({ content: formattedMarker, marker });
		setShowInfoWindow(true);
	};

	useEffect(() => {
		if (markerRef.current) {
			setInfoMarker({
				content: formatMarkerProps(selectedValue),
				marker: markerRef.current.marker,
			});
			setShowInfoWindow(true);
		}
	}, [selectedValue]);

	return (
		<div className="map-container">
			{props.loaded && (
				<Map ref={mapRef} {...defaultProps}>
					{markers.map((marker: IMarker) => (
						<Marker
							ref={marker.name === selectedValue.name ? markerRef : null}
							{...marker}
							onClick={onClickMarker}
						/>
					))}
					{polylineCoords.length > 0 && (
						<Polyline
							path={polylineCoords}
							strokeColor={setStatusIndicator(selectedValue.status)}
							strokeOpacity={0.8}
							strokeWeight={4}
						/>
					)}
					{infoMarker.content && (
						<InfoWindow
							marker={infoMarker.marker}
							visible={showInfoWindow}
							google={props.google}
							map={mapRef.current}
						>
							<InfoWindowContent content={infoMarker.content} />
						</InfoWindow>
					)}
				</Map>
			)}
		</div>
	);
};

const LoadingContainer = (props: any) => <Loading text="map" />;

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_API_KEY || "",
	LoadingContainer,
})(MapContainer);
