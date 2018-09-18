import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// This is a temp solution, and there is another way for authentication, but this works fine to and shows how to send a header with http
// const httpOptions = {
//   headers: new HttpHeaders({
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'api/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(userName): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + userName);
  }

  updateUser(userName: string, user: User) {
    return this.http.put(this.baseUrl + 'users/' + userName, user);
  }
}
