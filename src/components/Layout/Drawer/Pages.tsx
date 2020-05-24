import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import TrainIcon from "@material-ui/icons/Train";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.up("md")]: {
				display: "none",
			},
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);

export default function Pages() {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<List
			className={classes.root}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Pages
				</ListSubheader>
			}
		>
			<ListItem button component={Link} to="/">
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>

			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<TrainIcon />
				</ListItemIcon>
				<ListItemText primary="Map examples" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						component={Link}
						to="/maps/trains"
					>
						<ListItemIcon>
							<TrainIcon />
						</ListItemIcon>
						<ListItemText primary="Explore trains" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						component={Link}
						to="/maps/buses"
					>
						<ListItemIcon>
							<DirectionsBusIcon />
						</ListItemIcon>
						<ListItemText primary="Explore buses" />
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
