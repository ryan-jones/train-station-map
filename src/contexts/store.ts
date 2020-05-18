import { createContext } from "react";

interface IStore {
	state: any;
	dispatch: any;
}

const StoreContext = createContext<IStore>({
	state: {
		stations: [],
		selectedStation: {},
	},
	dispatch: null,
});

export default StoreContext;
