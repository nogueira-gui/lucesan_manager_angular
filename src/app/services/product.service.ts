import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'http://localhost:8080/v1/product';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/all`);
  }

  public save(product: Product): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`,product);
  }

  public deactive(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/deactivate/${id}`,new FormData());
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
