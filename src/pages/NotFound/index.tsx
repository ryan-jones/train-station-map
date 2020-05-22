import React from "react";
import useText from "../../hooks/useText";
import "./NotFound.scss";

export default function NotFoundPage(props: any) {
	const text = useText();
	return (
		<div className="page">
			<h2>{text.notFound.main}</h2>
			<p>{text.notFound.subtext}</p>
		</div>
	);
}
