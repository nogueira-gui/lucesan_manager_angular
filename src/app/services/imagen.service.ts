import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  // apiUrl = 'http://localhost:8080';
  apiUrl = 'https://lucesan.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  public list(url:string): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.apiUrl + url + 'list');
  }

  public upload(url:string, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.apiUrl + url + 'upload', formData);
  }

  public delete(url:string, id: number): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + url + `delete/${id}`);
  }
}
