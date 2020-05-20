import React, { ReactNode } from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer";

interface Props {
	title: string;
	subtitle: string;
	children?: ReactNode;
	isNotFound?: boolean;
}

export default function (props: Props) {
	return (
		<>
			<Header title={props.title} subtitle={props.subtitle} />
			{props.children && <Body>{props.children}</Body>}
			<Footer isNotFound={props.isNotFound} />
		</>
	);
}
