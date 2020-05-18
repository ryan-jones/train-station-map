import React, { useReducer } from "react";
import { render, wait } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { DEFAULT_REDUCER, INITIAL_STATE } from "../store";
import StoreContext from "../contexts/store";
import StationsView from "./StationsView";
import { FetchMock } from "@react-mock/fetch";
import { fetchStations } from "../utils";

const records = [
	{
		fields: {
			geopos: [0, 0],
			stationsbezeichung: "Main station",
			adresse: "123 Main St",
			plz: "Barcelona",
			ort: "Barcelona",
			email: "mainstation@gmail.com",
			service: "gepäck",
		},
	},
];
jest.mock("../utils");
fetchStations.mockResolvedValueOnce({ records });

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
		const { result, waitForValueToChange, waitForNextUpdate } = renderHook(() =>
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
		expect(fetchStations).toHaveBeenCalledTimes(1);
		expect(fetchStations).toHaveBeenCalledWith(0);
		await waitForNextUpdate(() =>
			expect(queryByText("123 Main")).toBeDefined()
		);
	});
});
