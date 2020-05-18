import React from "react";
import { setIcons } from "../../utils";
import { IStation } from "../../interfaces";
import luggageIcon from "../../assets/luggage.svg";
import loungeIcon from "../../assets/lounge.svg";
import moneyExchangeIcon from "../../assets/money.svg";

interface Props {
	station: IStation;
}

const icons: any = {
	luggageIcon,
	loungeIcon,
	moneyExchangeIcon,
};

export default function InfoWindowContent({ station }: Props) {
	const offeredIcons = setIcons(station).map((icon: string, i: number) => (
		<img key={`${i}-${icon}`} src={icons[icon]} alt="icon" />
	));

	return (
		<div className="info-window">
			<div className="info-window-location">
				<h2>{station.name}</h2>
				<p>{station.address}</p>
				<div className="info-window-details">
					<p>{station.email}</p>
					{offeredIcons}
				</div>
			</div>
		</div>
	);
}
