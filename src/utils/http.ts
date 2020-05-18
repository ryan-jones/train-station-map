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
