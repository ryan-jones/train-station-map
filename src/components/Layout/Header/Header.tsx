import React from "react";
import Image from "../../../assets/vue-background.png";
import "./Header.scss";
import Menu from "../Menu";

interface Props {
	title: string;
	subtitle?: string;
}

export default function Header(props: Props) {
	return (
		<header className="header">
			<Menu />
			<div className="header__banner">
				<img className="header__img" src={Image} alt="header" />
				<div className="overlay">
					<div className="text">
						<h1 className="text__title">{props.title}</h1>
						{props.subtitle && (
							<h3 className="text__sub-title">{props.subtitle}</h3>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
