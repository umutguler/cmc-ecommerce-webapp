import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartGuard } from '@app/guards/cart.guard';
import { CartComponent } from '@modules/cart/components/cart/cart.component';
import { CheckoutComponent } from '@modules/cart/components/checkout/checkout.component';
import { ThankyouComponent } from '@modules/cart/components/thankyou/thankyou.component';
import { ProductsComponent } from './modules/product/components/products/products.component';

const routes: Routes = [
	{ path: 'products', component: ProductsComponent },
	{ path: 'thankyou', component: ThankyouComponent },
	{
		path: '',
		runGuardsAndResolvers: 'always',
		canActivate: [CartGuard],
		children: [
			{ path: 'cart', component: CartComponent },
			{ path: 'checkout', component: CheckoutComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
