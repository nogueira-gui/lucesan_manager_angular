import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

//   apiUrl = 'http://localhost:8080/v1/category';
  apiUrl= 'https://lucesan.herokuapp.com/v1/category';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/all`);
  }

  public save(category: Category): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`,category);
  }

  public deactive(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/deactivate/${id}`,new FormData());
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
