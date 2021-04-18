export class CheckoutItem {
	id: number;
	quantity: number;
	name: string;
	price: number;
	constructor(id: number, quantity: number, name: string = '', price: number = 0) {
		this.id = id;
		this.quantity = quantity;
		this.name = name;
		this.price = price;
	}
}

export interface ICheckoutItem {
	price: number;
	shippingPrice: number;
}
export class Item implements ICheckoutItem {
	price: number;
	shippingPrice: number;
}
