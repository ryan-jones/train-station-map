import React, { ReactNode, Suspense } from "react";
import Body from "./Body/Body";
import Footer from "./Footer";
import Menu from "./Menu";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import useSetAppTheme from "../../hooks/useSetAppTheme";

interface Props {
	children?: ReactNode;
}

const NavDrawer = React.lazy(() => import("./Drawer"));

export default function (props: Props) {
	const { navDrawerOpen } = useSelector((state: any) => state.drawer);

	const theme = useSetAppTheme();

	return (
		<ThemeProvider theme={theme}>
			<Menu />
			{navDrawerOpen && (
				<Suspense fallback={<Loading text="settings" />}>
					<NavDrawer />
				</Suspense>
			)}
			{props.children && <Body>{props.children}</Body>}
			<Footer />
		</ThemeProvider>
	);
}
