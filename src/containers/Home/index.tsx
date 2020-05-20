import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Home.scss";

export default function HomePage() {
	const title = "welcome to the app!";
	return (
		<Layout title={title} subtitle={""}>
			<div className="home">
				<h1>This app isn't intended to make sense</h1>
				<p>
					After completing multiple exercises testing the same concepts, it just
					made sense to merge them into a larger example app.
				</p>
				<p>
					The purpose is to cover the generics, while also highlighting some
					things that often get overlooked in basic React tests.
				</p>
			</div>
		</Layout>
	);
}
