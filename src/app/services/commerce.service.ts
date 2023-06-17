import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Commerce } from '../common/commerce';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  apiUrl = environment.vcpBaseUrl;

  constructor(private http: HttpClient) { }

  getAllCommerces(): Observable<Commerce[]> {
    return this.http.get<{ commerces: Commerce[] }>(this.apiUrl)
      .pipe(
        map(response => response.commerces),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  }

  getCommerceByVilleId(villeId: number): Observable<Commerce[]> {
    return this.http.get<{ commerces: Commerce[] }>(this.apiUrl)
      .pipe(
        map(response => response.commerces.filter(commerce => commerce.ville_id === villeId)),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  }

}
