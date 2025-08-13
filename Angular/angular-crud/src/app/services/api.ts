import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://8b135bfb-9204-4df5-826c-963b46fe9aeb.mock.pstmn.io';

  constructor(private http: HttpClient) {}

  getTeste(): Observable<any> {
    return this.http.get(`${this.baseUrl}/teste`);
  }
}
