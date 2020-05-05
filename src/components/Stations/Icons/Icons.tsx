import React from "react";
import { setIcons } from "../../../utils";
import "./Icons.scss";
import { IStation } from "../../StationsView";
import luggageIcon from "../../../assets/luggage.svg";
import loungeIcon from "../../../assets/lounge.svg";
import moneyExchangeIcon from "../../../assets/money.svg";

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
				<img key={`${i}-${Math.random()}`} src={icons[icon]} alt="icon" />
			))}
		</div>
	);
}
