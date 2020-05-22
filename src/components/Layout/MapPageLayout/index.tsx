import React, { ReactNode, Suspense } from "react";
import PageContext from "../../../contexts/page";
import Loading from "../../Loading";
import Header from "../Header/Header";
import "./MapPageLayout.scss";

const Map = React.lazy(() => import("../../Map"));

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
			<Header title={props.title} subtitle={props.subtitle} />
			<div className="page-container">
				{props.children}
				{props.mapReady && (
					<Suspense fallback={<Loading text="map" />}>
						<div className="map-wrapper">
							<Map />
						</div>
					</Suspense>
				)}
			</div>
		</PageContext.Provider>
	);
}
