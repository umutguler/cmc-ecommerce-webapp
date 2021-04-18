import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cart = new Map<number, number>();
	private cartSource = new ReplaySubject<Map<number, number>>(1);
	private cartSizeSource = new ReplaySubject<number>(1);
	currentCart$ = this.cartSource.asObservable();
	currentCartSize$ = this.cartSizeSource.asObservable();

	constructor(private http: HttpClient) {
		if (localStorage.getItem('cart') !== null && localStorage.cartSize > 0) {
			this.cartSizeSource.next(localStorage.cartSize);
			this.cartSource.next(localStorage.cart);
		} else {
			this.cartSizeSource.next(0);
		}
	}

	// Adds product to cart local storage and storage to persist data
	storeProduct(productId: number) {
		if (localStorage.getItem('cart') === null) {
			this.cart.set(productId, 1);
			this.updateStorage();
		} else if (localStorage.getItem('cart') !== null) {
			let tempMap = new Map<number, number>();
			tempMap = new Map(JSON.parse(localStorage.getItem('cart')));
			this.cart = tempMap;

			// increments qty if exists
			// else sets initial value
			if (tempMap.has(productId)) {
				tempMap.set(productId, +tempMap.get(productId) + +1);
			} else {
				this.cart.set(productId, 1);
			}

			this.cart = tempMap;
			this.updateStorage();
		}
	}

	// deletes product from cart and storage
	delete(id: number) {
		this.cart = new Map<number, number>(JSON.parse(localStorage.getItem('cart')));
		this.cart.delete(id);
		this.updateStorage();
	}

	decrementQuantity(id: number) {
		this.cart = new Map<number, number>(JSON.parse(localStorage.getItem('cart')));

		if (this.cart.get(id) <= 1) {
			return false;
		} else {
			let value = this.cart.get(id);
			this.cart.set(id, +value - +1);
		}

		this.updateStorage();
		return true;
	}

	incrementQuantity(id: number) {
		this.cart = new Map<number, number>(JSON.parse(localStorage.getItem('cart')));
		let value = this.cart.get(id);
		this.cart.set(id, +value + +1);
		this.updateStorage();
	}

	// updates storage and cartsize
	private updateStorage() {
		this.cartSizeSource.next(this.cart.size);
		this.cartSource.next(this.cart);
		localStorage.cartSize = this.cart.size;
		localStorage.cart = JSON.stringify(Array.from(this.cart.entries()));
	}
}
