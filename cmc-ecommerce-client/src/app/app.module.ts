import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './layout/nav/nav.component';
import { CartModule } from '@modules/cart/cart.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [AppComponent, NavComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		ProductModule,
		CartModule,
		NgbModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right'
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
