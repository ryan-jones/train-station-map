import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
	it("should load the Text component", () => {
		const { getByText } = render(<Header />);
		const text = getByText(
			/An Interactive Map That Lets You Explore The Dense Network Of Railway Stations in Switzerland/i
		);
		expect(text).toBeInTheDocument();
	});
});
