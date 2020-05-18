export interface IStation {
	coordinates: {
		lat: string;
		lng: string;
	};
	name: string;
	email: string;
	address: string;
	service: string;
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
