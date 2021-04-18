import { Component, Input } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
	selector: 'app-products-item',
	templateUrl: './products-item.component.html',
	styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {
	@Input() product: IProduct;

	constructor(private cartService: CartService) {}

	addProductToCart() {
		this.cartService.storeProduct(this.product.id);
	}
}
