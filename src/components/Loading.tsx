import React from "react";
import "./Loading.scss";

interface IProps {
	text: string;
}
export default function Loading(props: IProps) {
	return (
		<div className="loading">
			<p>Currently loading {props.text}...</p>
		</div>
	);
}
