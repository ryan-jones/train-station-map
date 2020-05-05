import React from "react";
import Image from "../../../assets/vue-background.png";
import TextOverlay from "./TextOverlay/TextOverlay";
import Text from "./Text/Text";
import "./Header.scss";

export default function Header() {
	return (
		<header className="header">
			<div className="header__banner">
				<img className="header__img" src={Image} alt="header" />
				<TextOverlay>
					<Text />
				</TextOverlay>
			</div>
		</header>
	);
}
