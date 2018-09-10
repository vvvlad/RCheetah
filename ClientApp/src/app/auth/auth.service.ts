import { User } from './user.model';
import { AuthData, Token } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();
    base_url = 'https://localhost:44389/auth';

    constructor(private router: Router, private http: HttpClient) { }

// Linda tutorial auth function
    register(user) {
        // this deletes a property from the user object
        delete user.confirmPassword;
        this.http.post<Token>(this.base_url + '/register', user).subscribe(res => {
            localStorage.setItem('token', res.token);
        });
    }



// end Linda


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000)
        };
        this.authOk();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000)
        };
        this.authOk();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return {...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private authOk() {
        this.authChange.next(true);
        this.router.navigate(['/products']);
    }
}
