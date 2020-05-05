import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";

export default function (props: any) {
	return (
		<>
			<Header />
			<Body>{props.children}</Body>
		</>
	);
}
