import React from "react";
import HomePage from ".";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
	it("should render without crashing", () => {
		const { getByText } = render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		expect(getByText("Welcome to the app!")).toBeInTheDocument();
	});
});
