import React from "react";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./Footer.scss";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
			display: "flex",
			justifyContent: "space-evenly",
			alignItems: "center",
			padding: "15px",
		},
		icon: {
			color: theme.palette.text.primary,
		},
	})
);

export default function Footer() {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<Link href="https://github.com/ryan-jones" target="_blank" rel="noopener">
				<IconButton className={classes.icon}>
					<GitHubIcon fontSize="large" />
				</IconButton>
			</Link>
			<Link
				href="https://www.linkedin.com/in/ryanrjjones/"
				target="_blank"
				rel="noopener"
			>
				<IconButton className={classes.icon}>
					<LinkedInIcon fontSize="large" />
				</IconButton>
			</Link>
		</Container>
	);
}
