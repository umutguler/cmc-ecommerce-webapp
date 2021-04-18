import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	products: IProduct[];

	constructor(private productService: ProductsService, private cart: CartService) {}
	ngOnInit(): void {
		this.getProducts();
	}

	getProducts() {
		this.productService.getProducts().subscribe((response) => {
			this.products = response;
		});
	}
}
