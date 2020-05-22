import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../store/actions/settings";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
	root: {
		margin: "0 auto",
		paddingLeft: "15px",
	},
});

export default function ThemesOptions() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { useDarkTheme } = useSelector((state: any) => state.settings);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateSettings(event.target.name, event.target.checked));
	};

	return (
		<>
			<ListItem>
				<ListItemText primary="Manage Theme" />
			</ListItem>
			<FormGroup className={classes.root}>
				<FormControlLabel
					control={
						<Switch
							checked={useDarkTheme}
							onChange={handleChange}
							name="useDarkTheme"
						/>
					}
					label="Use Dark Theme"
				/>
			</FormGroup>
		</>
	);
}
