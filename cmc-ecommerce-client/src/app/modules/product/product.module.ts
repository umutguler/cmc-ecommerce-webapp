import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';

@NgModule({
	declarations: [ProductsComponent, ProductsItemComponent],
	imports: [CommonModule, ProductRoutingModule],
	exports: [ProductsItemComponent]
})
export class ProductModule {}
