import React, { ReactNode } from "react";

import "./List.scss";

interface Props {
	children: ReactNode;
	listError: boolean;
}

export default function BusList({ children, listError }: Props) {
	return (
		<div className="list">
			{children}
			{listError && (
				<div className="error">
					<p>
						There was an issue when attempting to retrieve the list of stations!
					</p>
					<p>Please try again in a few minutes</p>
				</div>
			)}
		</div>
	);
}
