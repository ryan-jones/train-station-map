interface IAction {
	type: string;
	payload: any;
}

export const STATIONS_LOADED = "STATIONS_LOADED";
export const SELECT_STATION = "SELECT_STATION";
export const LOAD_MORE_STATIONS = "LOAD_MORE_STATIONS";

export const DEFAULT_REDUCER = (store: any, action: IAction) => {
	switch (action.type) {
		case STATIONS_LOADED:
			return {
				selectedStation: {
					...action.payload[0],
				},
				stations: action.payload,
			};
		case SELECT_STATION:
			return {
				...store,
				selectedStation: action.payload,
			};
		case LOAD_MORE_STATIONS:
			return {
				...store,
				stations: [...store.stations, ...action.payload],
			};
		default:
			return store;
	}
};

export const INITIAL_STATE = {
	stations: [],
	selectedStation: {
		coordinates: {
			lat: "",
			lng: "",
		},
		name: "",
		email: "",
		address: "",
		service: "",
	},
};
