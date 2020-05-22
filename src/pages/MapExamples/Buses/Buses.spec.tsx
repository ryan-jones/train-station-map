import React, { useReducer } from "react";
import { render, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
	DEFAULT_REDUCER,
	INITIAL_STATE,
	TRAIN_STATIONS_LOADED,
} from "../../../store";
import StoreContext from "../../../contexts/store";
import { BrowserRouter } from "react-router-dom";
import { fetchBusRoutes } from "../../../utils/http";
import BusesPage from ".";
import { formatBusRoutes } from "../../../utils/formatters";

const date = new Date();
const routes = [
	{
		description: "Placa Catalunya",
		origin: {
			address: "Placa Catalunya, Barcelona",
			point: {
				_latitude: 1,
				_longitude: 1,
			},
			destination: {
				address: "Badalona",
				point: {
					_latitude: 5,
					_longitude: 5,
				},
			},
			stops: [
				{
					id: "1",
					address: "Poblenou",
					point: {
						_latitude: 3,
						_longitude: 3,
					},
				},
			],
			startTime: date,
			endTime: date,
			status: "ongoing",
		},
	},
];

jest.mock("../../utils/http");

describe("BusComponent", () => {
	it("loads the component without crashing", async () => {
		const { result } = renderHook(() =>
			useReducer(DEFAULT_REDUCER, INITIAL_STATE)
		);
		const [state, dispatch] = result.current;
		fetchBusRoutes.mockResolvedValueOnce(routes);

		const { queryByText } = render(
			<StoreContext.Provider value={{ state, dispatch }}>
				<BrowserRouter>
					<BusesPage />
				</BrowserRouter>
			</StoreContext.Provider>
		);

		expect(queryByText("Placa Catalunya")).toBeNull();

		await act(() =>
			result.current[1]({
				type: TRAIN_STATIONS_LOADED,
				payload: formatBusRoutes(routes),
			})
		);

		expect(fetchBusRoutes).toHaveBeenCalledTimes(1);
		expect(result.current[0]).toEqual({
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
				name: "Placa Catalunya",
				origin: {
					address: "Placa Catalunya, Barcelona",
					coordinates: {
						lat: 1,
						lng: 1,
					},
				},
				destination: {
					address: "Badalona",
					coordinates: {
						lat: 5,
						lng: 5,
					},
				},
				stops: [
					{
						id: "id",
						address: "Poblenou",
						coordinates: {
							lat: 3,
							lng: 3,
						},
					},
				],
				startTime: date,
				endTime: date,
			},
		});
	});
});
