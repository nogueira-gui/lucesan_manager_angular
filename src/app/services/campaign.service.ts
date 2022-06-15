import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  // apiUrl = 'http://localhost:8080/v1/campaign';
  apiUrl= 'http://ec2-52-67-31-141.sa-east-1.compute.amazonaws.com:8080/v1/campaign';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Campaign[]> {
    return this.httpClient.get<Campaign[]>(`${this.apiUrl}/all`);
  }

  public save(campaign: Campaign): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`,campaign);
  }

  public deactive(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/deactivate/${id}`,new FormData());
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
