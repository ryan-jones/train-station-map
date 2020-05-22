import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../../components/Layout/Header/Header";
import useText from "../../hooks/useText";
import "./Home.scss";

export default function HomePage() {
	const text = useText();
	const title = text.homePage.title;
	return (
		<>
			<Header title={title} subtitle={""} />
			<div className="home">
				<div className="text">
					<h2>{text.homePage.bodyMain}</h2>
					<p>{text.homePage.bodyParagraph1}</p>
					<p>{text.homePage.bodyParagraph2}</p>
				</div>
				<div className="btn-group">
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to="/trains"
					>
						Search for trains
					</Button>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to="/buses"
					>
						Search for buses
					</Button>
				</div>
			</div>
		</>
	);
}
