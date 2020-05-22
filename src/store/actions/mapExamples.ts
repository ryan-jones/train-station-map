import { Dispatch } from "redux";
import { fetchBusRoutes, fetchStations } from "../../utils/http";
import { IListValue } from "../../interfaces";
import { formatTrainStations } from "../../utils/formatters";

export const TRAIN_STATIONS_LOADED = "TRAIN_STATIONS_LOADED";
export const SELECT_TRAIN_STATION = "SELECT_TRAIN_STATION";
export const LOAD_MORE_TRAIN_STATIONS = "LOAD_MORE_TRAIN_STATIONS";
export const TRAIN_STATIONS_LOAD_ERROR = "TRAIN_STATIONS_LOAD_ERROR";
export const BUS_ROUTES_LOADED = "BUS_ROUTES_LOADED";
export const BUS_ROUTES_LOAD_ERROR = "BUS_ROUTES_LOAD_ERROR";
export const SELECT_BUS_ROUTE = "SELECT_BUS_ROUTE";

export const fetchBuses = () => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetchBusRoutes();
			dispatch({
				type: BUS_ROUTES_LOADED,
				payload: result,
			});
		} catch (err) {
			dispatch({ type: BUS_ROUTES_LOAD_ERROR });
		}
	};
};

export const fetchTrainStations = (from: number) => {
	return async (dispatch: Dispatch) => {
		try {
			const { records } = await fetchStations(from);
			const formattedStations: IListValue[] = formatTrainStations(records);
			dispatch({ type: TRAIN_STATIONS_LOADED, payload: formattedStations });
		} catch (err) {
			dispatch({ type: TRAIN_STATIONS_LOAD_ERROR });
		}
	};
};

export const selectBusRoute = (route: IListValue) => {
	return { type: SELECT_BUS_ROUTE, payload: route };
};

export const loadMoreTrainStations = (stationQty: number) => {
	return async (dispatch: Dispatch) => {
		try {
			const { records } = await fetchStations(stationQty);
			const newStations = formatTrainStations(records);
			dispatch({
				type: LOAD_MORE_TRAIN_STATIONS,
				payload: newStations,
			});
		} catch (err) {
			dispatch({ type: TRAIN_STATIONS_LOAD_ERROR });
		}
	};
};

export const selectTrainStation = (station: IListValue) => {
	return { type: SELECT_TRAIN_STATION, payload: station };
};
