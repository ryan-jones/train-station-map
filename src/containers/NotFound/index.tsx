import React from "react";
import Layout from "../../components/Layout/Layout";

export default function NotFoundPage(props: any) {
	console.log("props", props);
	return (
		<Layout
			isNotFound={true}
			title="Oops! This page doesn't exist"
			subtitle="Try one of the links to find your way!"
		></Layout>
	);
}
