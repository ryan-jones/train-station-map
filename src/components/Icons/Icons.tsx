import React from "react";
import { setIcons } from "../../utils";
import luggageIcon from "../../assets/luggage.svg";
import loungeIcon from "../../assets/lounge.svg";
import moneyExchangeIcon from "../../assets/money.svg";
import { IListValue } from "../../interfaces";
import "./Icons.scss";

const icons: any = {
	luggageIcon,
	loungeIcon,
	moneyExchangeIcon,
};

interface Icons {
	station: IListValue;
}
export default function Icons({ station }: Icons) {
	return (
		<div className="icons">
			{setIcons(station.service).map((icon: string, i: number) => (
				<img key={`${i}-${icon}`} src={icons[icon]} alt={`icon-${icon}`} />
			))}
		</div>
	);
}
