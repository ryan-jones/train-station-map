import { IListValue } from "../interfaces";

export const formatTrainStations = (records: any[]): IListValue[] => {
	return records.reduce((filteredRecords, { fields }) => {
		const existentRecord = filteredRecords.find(
			(fr: any) => fr.name === fields.stationsbezeichnung
		);
		if (existentRecord) {
			const index = filteredRecords.indexOf(existentRecord);
			filteredRecords[index].service += `,${fields.service}`;
			return filteredRecords;
		}
		return filteredRecords.concat({
			name: fields.stationsbezeichnung,
			origin: {
				address: `${fields.adresse}, ${fields.plz} ${fields.ort}`,
				coordinates: {
					lng: fields.geopos[1],
					lat: fields.geopos[0],
				},
			},
			destination: {
				address: null,
				coordinates: null,
			},
			stops: [],
			startTime: null,
			stopTime: null,
			price: null,
			status: "",
			email: fields.mail,
			service: fields.service,
		});
	}, []);
};

export const formatBusRoutes = (routes: any[]): IListValue[] => {
	return routes.map((route) => ({
		name: route.description,
		origin: {
			address: route.origin.address,
			coordinates: {
				lat: route.origin.point._latitude,
				lng: route.origin.point._longitude,
			},
		},
		destination: {
			address: route.destination.address,
			coordinates: {
				lat: route.destination.point._latitude,
				lng: route.destination.point._longitude,
			},
		},
		stops: route.stops.map((stop: any) => ({
			id: stop.id,
			address: "",
			coordinates: {
				lat: stop.point ? stop.point._latitude : null,
				lng: stop.point ? stop.point._longitude : null,
			},
		})),
		startTime: route.startTime,
		endTime: route.endTime,
		status: route.status,
		email: "",
		service: "",
	}));
};

export const formatMarkerProps = (result: any) => {
	return {
		address: result.address,
		position: result.position
			? result.position
			: { lat: result.point._latitude, lng: result.point._longitude },
		stopTime: result.stopTime,
		price: result.price,
		id: result.id,
		service: result.service,
		name: result.name,
	};
};
