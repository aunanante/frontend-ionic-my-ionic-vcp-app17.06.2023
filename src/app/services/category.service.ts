import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.vcpBaseUrl;

  constructor(private http: HttpClient) { }

  getAllProductCategories(): Observable<Category[]> {
    return this.http.get<{ categories: Category[] }>(this.apiUrl)
      .pipe(
        map(response => response.categories),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  }

  getProductCategoryByCommerceId(commerceId: number): Observable<Category[]> {
    return this.getAllProductCategories()
      .pipe(
        map(categories => categories.filter(categorie => categorie.commerce_id === commerceId)),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  }

}
