export class CartItem implements ICartItem {
	id: number;
	quantity: number;
	name: string;
	price: number;
	description: string;
	image: string;

	constructor(id: number, quantity: number, name: string, price: number, description: string, image: string) {
		this.id = id;
		this.quantity = quantity;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
	}
}

export interface ICartItem {
	id: number;
	quantity: number;
	name: string;
	price: number;
	description: string;
	image: string;
}
