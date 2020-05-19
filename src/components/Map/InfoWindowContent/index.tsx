import React from "react";
import { setIcons } from "../../../utils";
import luggageIcon from "../../../assets/luggage.svg";
import loungeIcon from "../../../assets/lounge.svg";
import moneyExchangeIcon from "../../../assets/money.svg";

interface Props {
	content: any;
}

const icons: any = {
	luggageIcon,
	loungeIcon,
	moneyExchangeIcon,
};

export default function InfoWindowContent({ content }: Props) {
	const setTime = (time: string): string => {
		const date = new Date(time);
		return `${date.getHours()}:${date.getMinutes()}`;
	};

	return (
		<div className="info-window">
			<div className="info-window-location">
				<h2>{content.name}</h2>
				<p>{content.address}</p>
				<div className="info-window-details">
					{content.service &&
						setIcons(content).map((icon: string, i: number) => (
							<img key={`${i}-${icon}`} src={icons[icon]} alt="icon" />
						))}
					{content.email && <p>{content.email}</p>}
					{content.stopTime && <p>Stop Time: {setTime(content.stopTime)}</p>}
					{content.price && <p>Ticket price: {content.price}</p>}
				</div>
			</div>
		</div>
	);
}
