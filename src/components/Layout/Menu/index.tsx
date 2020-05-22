import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { toggleNavDrawer } from "../../../store/actions/drawer";
import useText from "../../../hooks/useText";
import "./Menu.scss";

export default function Menu() {
	const dispatch = useDispatch();
	const text = useText();
	return (
		<nav className="menu">
			<IconButton color="inherit" onClick={() => dispatch(toggleNavDrawer())}>
				<MenuIcon />
			</IconButton>
			<div className="nav-btns">
				<Button
					color="inherit"
					startIcon={<HomeIcon />}
					component={Link}
					to="/"
				>
					{text.menu.home}
				</Button>
				<Dropdown />
			</div>
		</nav>
	);
}
