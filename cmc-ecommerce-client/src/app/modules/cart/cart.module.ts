import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';

@NgModule({
	declarations: [CartComponent, CartItemComponent, CheckoutComponent, ThankyouComponent],
	imports: [CommonModule, CartRoutingModule],
	exports: [CartComponent]
})
export class CartModule {}
