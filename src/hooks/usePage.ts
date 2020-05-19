import { useContext } from "react";
import PageContext from "../contexts/page";

export default function usePage() {
	return useContext(PageContext);
}
