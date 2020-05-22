import {
	SELECT_BUS_ROUTE,
	BUS_ROUTES_LOAD_ERROR,
	BUS_ROUTES_LOADED,
	LOAD_MORE_TRAIN_STATIONS,
	SELECT_TRAIN_STATION,
	TRAIN_STATIONS_LOAD_ERROR,
	TRAIN_STATIONS_LOADED,
} from "../actions/mapExamples";
import { formatBusRoutes } from "../../utils/formatters";

const initialState: any = {
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

const mapExamplesReducer = (state = initialState, action: any) => {
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

export default mapExamplesReducer;
