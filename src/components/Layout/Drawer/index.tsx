import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, Divider, createStyles, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Languages from "./Languages";
import Themes from "./Themes";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavDrawer } from "../../../store/actions/drawer";
import Pages from "./Pages";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
		},
		list: {
			width: 250,
		},
		root: {
			margin: "0 auto",
			paddingLeft: "15px",
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
		},
	})
);

export default function NavDrawer() {
	const dispatch = useDispatch();
	const { navDrawerOpen } = useSelector((state: any) => state.drawer);
	const classes = useStyles();

	const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === "keydown" &&
			((event as React.KeyboardEvent).key === "Tab" ||
				(event as React.KeyboardEvent).key === "Shift")
		) {
			return;
		}

		dispatch(toggleNavDrawer());
	};

	return (
		<Drawer
			classes={{
				paper: classes.paper,
			}}
			anchor="left"
			open={navDrawerOpen}
			onClose={toggleDrawer}
			variant="persistent"
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={toggleDrawer}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />

			<div
				className={classes.list}
				role="presentation"
				onKeyDown={toggleDrawer}
			>
				<Themes />
				<Divider />
				<Languages />
				<Divider />
				<Pages />
			</div>
		</Drawer>
	);
}
