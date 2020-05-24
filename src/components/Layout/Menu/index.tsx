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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menu: {
			position: "fixed",
			width: "100%",
			maxWidth: "100%",
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
		},
		toolbar: {
			display: "flex",
			justifyContent: "space-between",
		},
		nav: {
			display: "flex",
			width: "15%",
			alignItems: "center",
			justifyContent: "space-between",
		},
		navBtns: {
			[theme.breakpoints.down("sm")]: {
				display: "none",
			},
			width: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
	})
);

export default function Menu() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const text = useText();
	return (
		<AppBar className={classes.menu}>
			<Toolbar className={classes.toolbar}>
				<div className={classes.nav}>
					<IconButton
						color="inherit"
						onClick={() => dispatch(toggleNavDrawer())}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Example App
					</Typography>
				</div>
				<div className={classes.navBtns}>
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
			</Toolbar>
		</AppBar>
	);
}
