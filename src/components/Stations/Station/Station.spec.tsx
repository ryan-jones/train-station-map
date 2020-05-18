import React, { useReducer } from "react";
import { render, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import StoreContext from "../../../contexts/store";
import Station from "./Station";
import { IStation } from "../../../interfaces";
import { DEFAULT_REDUCER, INITIAL_STATE } from "../../../store";

describe("Station component", () => {
	const station: IStation = {
		name: "example",
		coordinates: {
			lat: "0",
			lng: "0",
		},
		address: "example address",
		email: "exampleemail@gmail.com",
		service: "gepäck,businesstravel-service-center, something-else",
	};

	it("should update selectedStation on click", () => {
		const { result } = renderHook(() =>
			useReducer(DEFAULT_REDUCER, INITIAL_STATE)
		);
		const [state, dispatch] = result.current;
		const { getByText } = render(
			<StoreContext.Provider value={{ state, dispatch }}>
				<Station {...station} />
			</StoreContext.Provider>
		);
		const node = getByText("example");
		fireEvent.click(node);

		expect(result.current[0]).toEqual({
			stations: [],
			selectedStation: station,
		});
	});
});
