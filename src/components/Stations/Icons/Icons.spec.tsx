import React from "react";
import { render } from "@testing-library/react";
import Icons from "./Icons";

describe("Icon component", () => {
	it("should only load the luggage and lounge icon", () => {
		const station = {
			name: "example",
			coordinates: {
				lat: "0",
				lng: "0",
			},
			address: "example address",
			email: "exampleemail@gmail.com",
			service: "gepäck,businesstravel-service-center, something-else",
		};
		const { queryByAltText } = render(<Icons station={station} />);
		expect(queryByAltText("icon-luggageIcon")).toBeInTheDocument();
		expect(queryByAltText("icon-loungeIcon")).toBeInTheDocument();
	});

	it("should only load the luggage icon one time", () => {
		const station = {
			name: "example",
			coordinates: {
				lat: "0",
				lng: "0",
			},
			address: "example address",
			email: "exampleemail@gmail.com",
			service: "gepäck, gepäckausgabe, gepäckaufbewahrung",
		};
		const { queryAllByAltText } = render(<Icons station={station} />);
		expect(queryAllByAltText("icon-luggageIcon")).toHaveLength(1);
	});
});
