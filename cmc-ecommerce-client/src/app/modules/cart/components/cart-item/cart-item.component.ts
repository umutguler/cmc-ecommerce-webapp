import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '@shared/models/cart';

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
	@Input() cartProduct: CartItem;
	@Output() deleteEvent = new EventEmitter<number>();
	@Output() decrementEvent = new EventEmitter<number>();
	@Output() incrementEvent = new EventEmitter<number>();

	constructor() {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	// Emitters for buttons
	deleteItem() {
		this.deleteEvent.emit(this.cartProduct.id);
	}

	decrementQuantity() {
		this.decrementEvent.emit(this.cartProduct.id);
	}

	incrementQuantity() {
		this.incrementEvent.emit(this.cartProduct.id);
	}
}
