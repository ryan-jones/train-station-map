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
	console.log("infoWindowContent", content);
	const setTime = (time: string): string => {
		const date = new Date(time);
		return `${date.getHours()}:${date.getMinutes()}`;
	};

	return (
		<div className="info-window" style={{ width: "300px", height: "300px" }}>
			<div className="info-window-location">
				<p
					style={{ fontSize: "24px", textAlign: "center", fontWeight: "bold" }}
				>
					{content.name || content.address}
				</p>
				<div
					className="info-window-details"
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						height: "100%",
					}}
				>
					<div style={{ display: "flex" }}>
						{content.service &&
							setIcons(content.service).map((icon: string, i: number) => (
								<img
									key={`${i}-${icon}`}
									src={icons[icon]}
									alt="icon"
									style={{ margin: "15px" }}
								/>
							))}
					</div>
					{content.email && <p>{content.email}</p>}
					{content.stopTime && <p>Stop Time: {setTime(content.stopTime)}</p>}
					{content.price && <p>Ticket price: {content.price}</p>}
				</div>
			</div>
		</div>
	);
}
