import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);
    }
    // return this.http.get<User[]>(this.baseUrl + 'users');
    // adding observe to get the full response instead only the body
    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe (
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getUser(userName): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + userName);
  }

  updateUser(userName: string, user: User) {
    return this.http.put(this.baseUrl + 'users/' + userName, user);
  }
}
