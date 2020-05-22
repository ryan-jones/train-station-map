import { TEXT } from "../constants/languages";
import { useSelector } from "react-redux";

export default function useText() {
	const settings = useSelector((state: any) => state.settings);
	const { language }: { language: string } = settings;
	return TEXT[language];
}
