import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class apiUsuarios {
  private baseUrl = 'https://8b135bfb-9204-4df5-826c-963b46fe9aeb.mock.pstmn.io';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/usuarios`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/usuarios/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/novo`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${id}`);
  }
}
