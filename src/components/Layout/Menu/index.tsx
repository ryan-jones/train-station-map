import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";
export default function Menu() {
	return (
		<nav className="menu">
			<Link to="/">Home</Link>
			<Link to="/trains">Explore Trains</Link>
			<Link to="/buses">Explore Buses</Link>
		</nav>
	);
}
