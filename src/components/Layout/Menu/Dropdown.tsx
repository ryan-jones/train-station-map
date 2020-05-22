import React, { useState, useRef } from "react";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import { Paper } from "@material-ui/core";
import TrainIcon from "@material-ui/icons/Train";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useText from "../../../hooks/useText";

export default function Dropdown() {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const text = useText();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: any) => {
		if (!anchorRef.current.contains(event.target)) {
			setOpen(false);
		}
	};

	function handleListKeyDown(event: any) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}
	return (
		<div>
			<Button
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				color="inherit"
				startIcon={<TrainIcon />}
			>
				{text.menu.maps.title}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom" ? "center top" : "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="menu-list-grow"
									onKeyDown={handleListKeyDown}
								>
									<MenuItem>
										<Button
											color="inherit"
											startIcon={<TrainIcon />}
											component={Link}
											to="/maps/trains"
										>
											{text.menu.maps.trains}
										</Button>
									</MenuItem>
									<MenuItem>
										<Button
											color="inherit"
											startIcon={<DirectionsBusIcon />}
											component={Link}
											to="/maps/buses"
										>
											{text.menu.maps.buses}
										</Button>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}
