import React, { ReactNode } from "react";
import PageContext from "../../../contexts/page";
import Layout from "../Layout";
import Map from "../../Map";
import "./PageLayout.scss";

interface Props {
	page: string;
	title: string;
	subtitle: string;
	children: ReactNode;
	mapReady: boolean;
}
export default function PageLayout(props: Props) {
	return (
		<PageContext.Provider value={props.page}>
			<Layout title={props.title} subtitle={props.subtitle}>
				<div className="page-container">
					{props.children}
					{props.mapReady && (
						<div className="map-wrapper">
							<Map />
						</div>
					)}
				</div>
			</Layout>
		</PageContext.Provider>
	);
}
