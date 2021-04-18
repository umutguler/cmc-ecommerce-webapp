import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProducts, Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	constructor(private http: HttpClient) {}

	getProducts(): Observable<any> {
		return this.http.get<IProduct[]>(environment.apiUrl + '/products');
	}

	getProduct(id: number): Observable<any> {
		return this.http.get<IProduct>(environment.apiUrl + '/products/' + id);
	}
}
