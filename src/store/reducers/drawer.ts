import { TOGGLE_NAV_DRAWER } from "../actions/drawer";

const initialState: any = {
	navDrawerOpen: false,
};

const drawerReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case TOGGLE_NAV_DRAWER:
			return {
				...state,
				navDrawerOpen: !state.navDrawerOpen,
			};
		default:
			return state;
	}
};

export default drawerReducer;
