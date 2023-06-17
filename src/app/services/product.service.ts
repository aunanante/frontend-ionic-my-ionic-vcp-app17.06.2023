import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.vcpBaseUrl;
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl)
    .pipe(
      map(data => data.products),
      catchError(error => {
        console.error(error);
        return [];
      })
    );
  }

  getProductByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map(data => data.products.filter(product => product.productCategory_id === categoryId)),
      catchError(error => {
        console.error(error);
        return [];
      })
    );
  }

}
