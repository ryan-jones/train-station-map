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

export const setIcons = (service: string = ""): string[] => {
	const providedServices: string[] = [...service.toLowerCase().split(",")];

	return providedServices.reduce((services: string[], current: string) => {
		return acceptedValues.includes(current) &&
			!iconAlreadyDisplayed(services, current)
			? services.concat(selectIcon(current.trim()))
			: services;
	}, []);
};

export const setStatusIndicator = (status: string): string => {
	switch (status) {
		case "scheduled":
			return "orange";
		case "cancelled":
			return "red";
		case "ongoing":
		case "finalized":
		default:
			return "green";
	}
};
