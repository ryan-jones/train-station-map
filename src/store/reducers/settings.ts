import { UPDATE_SETTINGS } from "../actions/settings";

const initialState: any = {
	useDarkTheme: true,
	language: "en",
};

const settingsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case UPDATE_SETTINGS:
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};
		default:
			return state;
	}
};

export default settingsReducer;
