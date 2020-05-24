import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core";

export default function useSetAppTheme() {
	const { useDarkTheme } = useSelector((state: any) => state.settings);

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: useDarkTheme ? "dark" : "light",
				},
			}),
		[useDarkTheme]
	);
	return theme;
}
