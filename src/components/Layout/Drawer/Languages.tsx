import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../store/actions/settings";

const useStyles = makeStyles({
	formControl: {
		width: "100%",
	},
	select: {
		margin: "15px",
	},
});

export default function Languages() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { language } = useSelector((state: any) => state.settings);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(updateSettings("language", event.target.value));
	};

	return (
		<>
			<ListItem>
				<ListItemText primary="Select Language" />
			</ListItem>
			<FormControl className={classes.formControl} variant="outlined">
				<NativeSelect
					className={classes.select}
					value={language}
					onChange={handleChange}
					name="language"
					inputProps={{ "aria-label": "language" }}
				>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="zh">中文</option>
				</NativeSelect>
			</FormControl>
		</>
	);
}
