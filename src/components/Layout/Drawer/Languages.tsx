import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
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
	const dispatch = useDispatch();
	const { language } = useSelector((state: any) => state.settings);
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(updateSettings("language", event.target.value));
	};

	return (
		<>
			<List
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Select Language
					</ListSubheader>
				}
			>
				{/* <ListItem> */}
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
				{/* </ListItem> */}
			</List>
		</>
	);
}
