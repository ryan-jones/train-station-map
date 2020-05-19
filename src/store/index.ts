import { IState, IAction } from "../interfaces";
import { formatBusRoutes } from "../utils/formatters";

export const TRAIN_STATIONS_LOADED = "TRAIN_STATIONS_LOADED";
export const SELECT_TRAIN_STATION = "SELECT_TRAIN_STATION";
export const LOAD_MORE_TRAIN_STATIONS = "LOAD_MORE_TRAIN_STATIONS";
export const TRAIN_STATIONS_LOAD_ERROR = "TRAIN_STATIONS_LOAD_ERROR";
export const BUS_ROUTES_LOADED = "BUS_ROUTES_LOADED";
export const BUS_ROUTES_LOAD_ERROR = "BUS_ROUTES_LOAD_ERROR";
export const SELECT_BUS_ROUTE = "SELECT_BUS_ROUTE";

export const DEFAULT_REDUCER = (state: IState, action: IAction) => {
	switch (action.type) {
		case TRAIN_STATIONS_LOADED:
			return {
				...state,
				trains: {
					error: false,
					selectedStation: {
						...action.payload[0],
					},
					stations: action.payload,
				},
			};
		case TRAIN_STATIONS_LOAD_ERROR:
			return {
				...state,
				trains: {
					...state.trains,
					error: true,
				},
			};
		case SELECT_TRAIN_STATION:
			return {
				...state,
				trains: {
					...state.trains,
					selectedStation: action.payload,
				},
			};
		case LOAD_MORE_TRAIN_STATIONS:
			return {
				...state,
				trains: {
					...state.trains,
					stations: [...state.trains.stations, ...action.payload],
				},
			};
		case BUS_ROUTES_LOADED:
			const formattedBusRoutes = formatBusRoutes(action.payload);

			return {
				...state,
				buses: {
					error: false,
					routes: formattedBusRoutes,
					currentRoute: formattedBusRoutes[0],
				},
			};
		case BUS_ROUTES_LOAD_ERROR:
			return {
				...state,
				buses: {
					...state.buses,
					error: true,
				},
			};
		case SELECT_BUS_ROUTE:
			return {
				...state,
				buses: {
					...state.buses,
					currentRoute: action.payload,
				},
			};
		default:
			return state;
	}
};

export const INITIAL_STATE: IState = {
	contentType: "",
	trains: {
		error: false,
		stations: [],
		selectedStation: {
			origin: {
				address: "",
				coordinates: {
					lat: 0,
					lng: 0,
				},
			},
			name: "",
			email: "",
			service: "",
			status: "",
			stops: [],
		},
	},
	buses: {
		error: false,
		routes: [],
		currentRoute: {
			name: "",
			origin: {
				address: "",
				coordinates: {
					lat: 0,
					lng: 0,
				},
			},
			stops: [],
			status: "",
		},
	},
};
