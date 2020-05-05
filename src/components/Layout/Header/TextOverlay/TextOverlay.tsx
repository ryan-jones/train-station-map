import React from "react";
import "./TextOverlay.scss";

export default function TextOverlay(props: any) {
	return <div className="overlay">{props.children}</div>;
}
