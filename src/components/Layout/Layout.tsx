import React, { ReactNode } from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer";

interface Props {
	children: ReactNode;
	title: string;
	subtitle: string;
}

export default function (props: Props) {
	return (
		<>
			<Header title={props.title} subtitle={props.subtitle} />
			<Body>{props.children}</Body>
			<Footer />
		</>
	);
}
