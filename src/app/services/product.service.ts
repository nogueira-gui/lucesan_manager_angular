import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // apiUrlTeste = 'http://localhost:8080/v1/product';
  apiUrl= 'https://ec2-52-67-31-141.sa-east-1.compute.amazonaws.com:8080/v1/product';

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
