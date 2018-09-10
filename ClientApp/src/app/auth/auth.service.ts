import {Component} from '@angular/core';
import { User } from './user.model';
import { AuthData, Token } from './auth-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();
    base_url = 'https://localhost:44389/auth/';

    constructor(private router: Router, private http: HttpClient, private snack: MatSnackBar) { }


    login(model: any) {
        this.http.post(this.base_url + 'login', model).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem('token', user.token);
                }
            })
        )
         .subscribe(
            next => {
                const snackRef = this.snack.open('Success', 'User logged in', {duration: 4000, panelClass: ['snack-bar-color-ok']});
                snackRef.onAction().subscribe(() => {
                    console.log('clicked on action');
                });

                this.authOk();
            }, error => {
                this.snack.open('Failure login', error, {duration: 4000});
        });

    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    register(model: any) {
        this.http.post<Token>(this.base_url + 'register', model).subscribe(
            next => {
                console.log('register in OK');

                this.authOk();
            }, error => {
                console.log('register to login' + error);
        });
    }




// Linda tutorial auth function
    register1(user) {
        // this deletes a property from the user object
        delete user.confirmPassword;
        this.http.post<Token>(this.base_url + '/register', user).subscribe(res => {
            localStorage.setItem('token', res.token);
        });
    }



// end Linda


    // registerUser(authData: AuthData) {
    //     this.user = {
    //         email: authData.email,
    //         userId: Math.round(Math.random() * 10000)
    //     };
    //     this.authOk();
    // }


    logout1() {
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
