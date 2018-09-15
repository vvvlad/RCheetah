import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  base_url = environment.apiUrl + 'api/';
  // base_url = 'https://localhost:44389/api';
  private messageSubject  = new Subject();
  private messageStore = [];
  messages = this.messageSubject.asObservable();
  // TODO - find how to use the ${config.apiUrl} for base URL
  constructor(private http: HttpClient) { }

  getMessages(user) {
      user = (user) ? '/' + user : ''; // for case where no user is sent
      this.http.get<any>(this.base_url + '/messages' + user)
        .subscribe(response => {
            this.messageStore = response;
            this.messageSubject.next(this.messageStore);
        },
        error => {
            console.log('Error message');
        });
  }

  postMessage(message) {
    this.http.post(this.base_url + '/messages', message).subscribe(response => {
      this.messageStore.push(response);
      this.messageSubject.next(this.messageStore);
    });
  }
}
