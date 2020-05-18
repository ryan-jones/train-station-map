import React, { useReducer } from "react";
import { render, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { DEFAULT_REDUCER, INITIAL_STATE, STATIONS_LOADED } from "../store";
import StoreContext from "../contexts/store";
import StationsView from "./StationsView";
import { formatStations } from "../utils";
import { fetchStations } from "../utils/http";

const records = [
	{
		fields: {
			geopos: [0, 0],
			stationsbezeichnung: "Main station",
			adresse: "123 Main St",
			plz: "Barcelona",
			ort: "Barcelona",
			mail: "mainstation@gmail.com",
			service: "gepäck",
		},
	},
];
jest.mock("../utils/http");

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
	observe,
	unobserve,
	root: null,
	rootMargin: "",
	thresholds: [],
	disconnect: () => {},
	takeRecords: () => [],
}));

describe("StationsViewComponent", () => {
	it("loads the component without crashing", async () => {
		const { result } = renderHook(() =>
			useReducer(DEFAULT_REDUCER, INITIAL_STATE)
		);
		const [state, dispatch] = result.current;
		fetchStations.mockResolvedValueOnce({ records });

		const { queryByText } = render(
			<StoreContext.Provider value={{ state, dispatch }}>
				<StationsView />
			</StoreContext.Provider>
		);
		expect(queryByText("123 Main St")).toBeNull();

		await act(() =>
			result.current[1]({
				type: STATIONS_LOADED,
				payload: formatStations(records),
			})
		);
		expect(fetchStations).toHaveBeenCalledTimes(1);
		expect(fetchStations).toHaveBeenCalledWith(0);
		expect(result.current[0]).toEqual({
			stations: formatStations(records),
			selectedStation: formatStations(records)[0],
		});
	});
});
