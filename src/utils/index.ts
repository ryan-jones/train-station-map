import { IStation } from "../components/StationsView";

export const setUrl = (startAt: number) =>
	`https://data.sbb.ch/api/records/1.0/search/?dataset=kontaktadressen&facet=service&rows=30&start=${startAt}`;

export const fetchStations = (startAt: number): Promise<any> => {
	return fetch(setUrl(startAt)).then((res) => {
		if (res.status === 200) {
			return res.json();
		}
		return new Error(`Error of type ${res.status}`);
	});
};

export const formatStations = (records: any[]) => {
	return records.map(({ fields }: any) => ({
		coordinates: {
			lng: fields.geopos[1],
			lat: fields.geopos[0],
		},
		name: fields.stationsbezeichnung,
		address: `${fields.adresse}, ${fields.plz} ${fields.ort}`,
		email: fields.mail,
		service: fields.service,
	}));
};

const selectIcon = (service: string): string => {
	switch (service) {
		case "gepäck":
		case "gepäckausgabe":
		case "gepäckaufbewahrung":
			return "luggageIcon";
		case "businesstravel-service-center":
			return "loungeIcon";
		case "geldwechsel":
		case "western union":
			return "moneyExchangeIcon";
		default:
			return "";
	}
};

const acceptedValues: string[] = [
	"gepäck",
	"gepäckausgabe",
	"gepäckaufbewahrung",
	"businesstravel-service-center",
	"geldwechsel",
	"western union",
];

export const setIcons = (station: IStation): string[] => {
	const providedServices: string[] = [
		...station.service.toLowerCase().split(","),
	];
	return providedServices.reduce((services: string[], current: string) => {
		return acceptedValues.includes(current)
			? services.concat(selectIcon(current))
			: services;
	}, []);
};
