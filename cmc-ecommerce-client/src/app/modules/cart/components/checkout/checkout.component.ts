import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '@app/services/checkout.service';
import { CheckoutItem } from '@shared/models/checkout';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	cart = new Map<number, number>();
	subTotalPrice: number;
	shippingPrice: number;
	checkoutItems = [];

	constructor(private checkoutService: CheckoutService, private router: Router) {}

	ngOnInit(): void {
		this.subTotalPrice = 0;
		this.shippingPrice = 0;
		this.postCartToCheck();
	}

	// Checks the prices against the API
	postCartToCheck() {
		this.cart = new Map<number, number>(JSON.parse(localStorage.getItem('cart')));

		this.cart.forEach((value: number, key: number) => {
			this.checkoutItems.push(new CheckoutItem(key, value));
		});

		this.checkoutService.checkValues(this.checkoutItems, 'calculate').subscribe();

		// sets the prices
		this.subTotalPrice = localStorage.price;
		this.shippingPrice = localStorage.shippingPrice;
	}

	postPlaceOrder() {
		this.checkoutService.checkValues(this.checkoutItems, 'placeorder').subscribe();
		localStorage.clear();
	}

	// keeps track of localstorage values
	getPrice() {
		return localStorage.price;
	}

	getShippingPrice() {
		return localStorage.shippingPrice;
	}
}
