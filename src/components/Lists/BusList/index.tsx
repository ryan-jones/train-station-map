import React from "react";
import BusListItem from "./BusListItem";
import { IListValue } from "../../../interfaces";
import List from "../index";

interface Props {
	routes: IListValue[];
	listError: boolean;
}

export default function BusList({ routes, listError }: Props) {
	return (
		<List listError={listError}>
			{routes.length > 0 &&
				routes.map((route: IListValue) => (
					<BusListItem key={route.name} result={route} />
				))}
		</List>
	);
}
