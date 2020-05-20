import React from "react";
import "./Footer.scss";

interface Props {
	isNotFound?: boolean;
}

export default function Footer({ isNotFound }: Props) {
	const style = isNotFound ? "footer-extended" : "footer";
	return (
		<div className={style}>
			<p>
				Github:{" "}
				<a href="https://github.com/ryan-jones">github.com/ryan-jones</a>
			</p>
			<p>
				LinkedIn:{" "}
				<a href="https://www.linkedin.com/in/ryanrjjones/">
					https://www.linkedin.com/in/ryanrjjones/
				</a>
			</p>
		</div>
	);
}
