export interface IState {
	contentType: string;
	buses: {
		error: boolean;
		routes: IListValue[];
		currentRoute: IListValue;
	};
	trains: {
		error: boolean;
		stations: IListValue[];
		selectedStation: IListValue;
	};
}

export interface IListValue {
	name: string;
	origin: {
		address: string;
		coordinates: ICoordinates;
	};
	stops: {
		address: string;
		id: number;
		coordinates: ICoordinates;
	}[];
	status: string;
	destination?: {
		address: string;
		coordinates: ICoordinates;
	};
	endTime?: string;
	startTime?: string;
	email?: string;
	service?: string;
}

export interface ICoordinates {
	lat: number;
	lng: number;
}

export interface IMarker {
	position: ICoordinates;
	key: string;
	name: string;
	service: string;
	address: string;
	email: string;
	id?: number;
}

export interface IAction {
	type: string;
	payload: any;
}
