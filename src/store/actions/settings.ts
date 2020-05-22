export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export const updateSettings = (key: string, value: any) => {
	return {
		type: UPDATE_SETTINGS,
		payload: { key, value },
	};
};
