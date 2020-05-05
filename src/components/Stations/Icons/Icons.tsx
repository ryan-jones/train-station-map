import React from "react";
import { setIcons } from "../../../utils";
import { IStation } from "../../StationsView";
import luggageIcon from "../../../assets/luggage.svg";
import loungeIcon from "../../../assets/lounge.svg";
import moneyExchangeIcon from "../../../assets/money.svg";
import "./Icons.scss";

const icons: any = {
	luggageIcon,
	loungeIcon,
	moneyExchangeIcon,
};

interface Icons {
	station: IStation;
}
export default function Icons({ station }: Icons) {
	return (
		<div className="icons">
			{setIcons(station).map((icon: string, i: number) => (
				<img key={`${i}-${icon}`} src={icons[icon]} alt="icon" />
			))}
		</div>
	);
}
