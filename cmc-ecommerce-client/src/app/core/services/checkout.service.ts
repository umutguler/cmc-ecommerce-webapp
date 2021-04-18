import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { CheckoutItem, Item } from '@shared/models/checkout';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CheckoutService {
	constructor(private http: HttpClient) {}
	checkValues(model: any, endpoint: string) {
		return this.http.post(environment.apiUrl + '/checkout/' + endpoint, model).pipe(
			map((data: Item) => {
				localStorage.price = data.price;
				localStorage.shippingPrice = data.shippingPrice;
			})
		);
	}
}
