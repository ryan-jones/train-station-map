import { createContext } from "react";
import { IState } from "../interfaces";

interface IStore {
	state: IState;
	dispatch: any;
}

const StoreContext = createContext<IStore>({
	state: {
		contentType: "",
		trains: {
			error: false,
			stations: [],
			selectedStation: {
				origin: {
					address: "",
					coordinates: {
						lat: 0,
						lng: 0,
					},
				},
				name: "",
				email: "",
				service: "",
				status: "",
				stops: [],
			},
		},
		buses: {
			error: false,
			routes: [],
			currentRoute: {
				name: "",
				origin: {
					address: "",
					coordinates: {
						lat: 0,
						lng: 0,
					},
				},
				stops: [],
				status: "",
			},
		},
	},
	dispatch: null,
});

export default StoreContext;
