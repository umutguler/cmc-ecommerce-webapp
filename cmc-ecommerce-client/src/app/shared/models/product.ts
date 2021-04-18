export interface IProduct {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
}

export class Product implements IProduct {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
}

export class IProducts {
	products: IProduct[];
}

export class Products implements IProducts {
	products: IProduct[];
}
