import React from "react";

export default function BodyLayout(props: any) {
	return (
		<div style={{ height: "100%", backgroundColor: "#F5F5F5" }}>
			{props.children}
		</div>
	);
}
