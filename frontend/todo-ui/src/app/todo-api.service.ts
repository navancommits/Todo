import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TodoItem = {
  id: string;
  title: string;
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private readonly baseUrl = '/api/todos'; // adjust to your backend HTTPS port

  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl);
  }

  create(title: string): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.baseUrl, { title });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}