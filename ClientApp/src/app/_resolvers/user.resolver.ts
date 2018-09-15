import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router) {

    }
    resolve (route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['userName']).pipe(
            catchError(error => {
                this.router.navigate(['/welcome']);
                return of(null);
            })
        );
    }
}
