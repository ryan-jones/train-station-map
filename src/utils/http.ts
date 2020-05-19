const busUrl = "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api";

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

export const fetchBusRoutes = (): Promise<any> => {
	return fetch(`${busUrl}/trips`).then((res) => {
		if (res.status === 200) {
			return res.json();
		}
		return new Error(`Error of type ${res.status}`);
	});
};

export const fetchStopData = (id: number): Promise<any> => {
	return fetch(`${busUrl}/stops/${id}`).then((res) => {
		if (res.status === 200) {
			return res.json();
		}
		return new Error(`Error of type ${res.status}`);
	});
};
