import React from "react";
import Loading from ".";
import { render } from "@testing-library/react";

describe("Loading", () => {
	it("should render with the correct loading message", () => {
		const { getByText } = render(<Loading text="example" />);
		expect(getByText("Currently loading example..."));
	});
});
