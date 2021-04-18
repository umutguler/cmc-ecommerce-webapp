import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	cartSize = 0;
	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		// Keep track of cart value for user
		this.cartService.currentCartSize$.subscribe((cartSize) => {
			this.cartSize = cartSize;
		});
	}
}
