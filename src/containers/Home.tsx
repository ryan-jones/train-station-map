import React from "react";
import Layout from "../components/Layout/Layout";

export default function HomePage() {
	const title = "welcome to the app!";
	const subtitle = "this is a placeholder";
	return (
		<Layout title={title} subtitle={subtitle}>
			<div>
				<h1>placeholder for home</h1>
			</div>
		</Layout>
	);
}
