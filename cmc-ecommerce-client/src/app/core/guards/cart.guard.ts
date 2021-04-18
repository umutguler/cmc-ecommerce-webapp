import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '@app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CartGuard implements CanActivate {
	constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) {}

	canActivate(): Observable<boolean> {
		return this.cartService.currentCartSize$.pipe(
			map((size) => {
				if (size > 0) {
					return true;
				} else {
					this.toastr.error('Add items to your cart first');
					this.router.navigateByUrl('/products');
					return false;
				}
			})
		);
	}
}
