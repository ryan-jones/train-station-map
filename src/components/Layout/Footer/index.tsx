import React from "react";
import "./Footer.scss";

interface Props {
	isNotFound?: boolean;
}

export default function Footer({ isNotFound }: Props) {
	const style = isNotFound ? "footer-extended" : "footer";
	return <div className={style}>The footer</div>;
}
