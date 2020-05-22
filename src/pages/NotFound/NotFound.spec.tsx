import React from "react";
import NotFoundPage from ".";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Not Found Page", () => {
	it("should render without crashing", () => {
		const { getByText } = render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);
		expect(getByText("Oops! This page doesn't exist")).toBeInTheDocument();
	});
});
