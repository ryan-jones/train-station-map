import React, { ReactNode, Suspense } from "react";
import Body from "./Body/Body";
import Footer from "./Footer";
import Menu from "./Menu";
import Loading from "../Loading";
import { useSelector } from "react-redux";

interface Props {
	children?: ReactNode;
	isNotFound?: boolean;
}

const NavDrawer = React.lazy(() => import("./Drawer"));

export default function (props: Props) {
	const { navDrawerOpen } = useSelector((state: any) => state.drawer);
	return (
		<>
			<Menu />
			{navDrawerOpen && (
				<Suspense fallback={<Loading text="settings" />}>
					<NavDrawer />
				</Suspense>
			)}
			{props.children && <Body>{props.children}</Body>}
			<Footer isNotFound={props.isNotFound} />
		</>
	);
}
