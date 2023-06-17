import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Ville } from '../common/ville';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  apiUrl = environment.vcpBaseUrl
  constructor(private http: HttpClient) { }

  getAllVilles(): Observable<Ville[]> {
    return this.http.get<{ villes: Ville[] }>(this.apiUrl)
      .pipe(
        map(response => response.villes),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  }

}