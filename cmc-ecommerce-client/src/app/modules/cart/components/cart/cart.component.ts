import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { environment } from '@env';
import { CartItem, ICartItem } from '@shared/models/cart';
import { IProduct } from '@shared/models/product';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	// Main dictionary for cart page
	cartProducts = new Map<number, ICartItem>();
	subTotalPrice;
	shippingPrice;

	constructor(private http: HttpClient, private cartService: CartService) {}

	ngOnInit(): void {
		let cartQuantityPair = this.getCartProducts();
		this.cartProducts = this.setCartProducts(cartQuantityPair[0], cartQuantityPair[1]);
	}

	// Performs GET HTTP request of id arryay for product
	// appends the product ids to the array
	// Returns a TUPLE of [response, id-quantity map]
	getCartProducts() {
		let tempMap = new Map<number, number>(JSON.parse(localStorage.getItem('cart')));
		let params = new HttpParams();

		tempMap.forEach((_value: number, key: number) => {
			params = params.append('id', String(key));
		});

		let response = this.http.get(environment.apiUrl + '/products/query', { params: params });

		return [response, tempMap];
	}

	// Maps the Product with the Quanity to one object
	// Returns the dictionary for the cart
	setCartProducts(response: any, tempMap: any) {
		let cart = new Map<number, ICartItem>();

		response.subscribe((response) => {
			for (const i in response) {
				let product = response[i] as IProduct;
				let cartProduct = new CartItem(
					product.id,
					tempMap.get(product.id),
					product.name,
					product.price,
					product.description,
					product.image
				);
				cart.set(<number>product.id, <ICartItem>cartProduct);
				this.subTotalPrice = this.calcSubTotalPrice();
			}
		});

		return cart;
	}

	updateStorage(id: any) {}
	// Delete cart item
	deleteEvent($event) {
		this.cartService.delete($event);
		this.cartProducts.delete($event);
		this.subTotalPrice = this.calcSubTotalPrice();
	}

	// Decrement cart quantity
	decrementEvent($event) {
		if (this.cartService.decrementQuantity($event)) {
			let item = this.cartProducts.get($event);
			item.quantity--;
			this.cartProducts.set($event, item);
		}
		this.subTotalPrice = this.calcSubTotalPrice();
	}

	// Increment cart quantity
	incrementEvent($event) {
		this.cartService.incrementQuantity($event);
		let item = this.cartProducts.get($event);
		item.quantity++;
		this.cartProducts.set($event, item);
		this.subTotalPrice = this.calcSubTotalPrice();
	}

	calcSubTotalPrice() {
		let sum = 0.0;
		this.cartProducts.forEach((value) => {
			sum += value.price * value.quantity;
		});

		this.calcShipping(sum);
		return sum;
	}

	calcShipping(price: number) {
		if (price <= 50.0) {
			this.shippingPrice = 10.0;
		} else {
			this.shippingPrice = 20.0;
		}
	}
}
