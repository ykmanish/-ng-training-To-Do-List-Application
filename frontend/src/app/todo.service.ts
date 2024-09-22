import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Method to create a new Todo
  createTodo(todoData: any): Observable<any> {
    console.log('Calling API to create a new todo');
    return this.http.post<any>(`${this.apiUrl}/todo`, todoData);
  }

  // Method to fetch all todos with optional search query
  getAllTodos(searchQuery?: string): Observable<any> {
    console.log('Calling API to fetch all todos');
    let url = `${this.apiUrl}/todos`;
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }
    return this.http.get<any>(url);
  }

  // Method to update an existing Todo
  updateTodo(todoId: string, todoData: any): Observable<any> {
    console.log('Calling API to update a todo');
    return this.http.put<any>(`${this.apiUrl}/todo/${todoId}`, todoData);
  }

  // Method to delete a Todo
  deleteTodoById(todoId: string): Observable<any> {
    console.log('Calling API to delete a todo');
    return this.http.delete<any>(`${this.apiUrl}/todo/${todoId}`);
  }
}
