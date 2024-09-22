import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl  =  'http://localhost:3000';

  constructor(private http: HttpClient) { }


  // Method to fetch all users with pagination
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
}
