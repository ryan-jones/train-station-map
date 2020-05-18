import { IStation } from "../components/StationsView";

export const formatStations = (records: any[]) => {
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
			coordinates: {
				lng: fields.geopos[1],
				lat: fields.geopos[0],
			},
			name: fields.stationsbezeichnung,
			address: `${fields.adresse}, ${fields.plz} ${fields.ort}`,
			email: fields.mail,
			service: fields.service,
		});
	}, []);
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

const iconAlreadyDisplayed = (services: string[], current: string) => {
	switch (current) {
		case "gepäck":
		case "gepäckausgabe":
		case "gepäckaufbewahrung":
			return services.includes("luggageIcon");
		case "businesstravel-service-center":
			return services.includes("loungeIcon");
		case "geldwechsel":
		case "western union":
			return services.includes("moneyExchangeIcon");
		default:
			return true;
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
		return acceptedValues.includes(current) &&
			!iconAlreadyDisplayed(services, current)
			? services.concat(selectIcon(current.trim()))
			: services;
	}, []);
};
