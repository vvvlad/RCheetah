import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EditUserResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private auth: AuthService) {

    }
    resolve (route: ActivatedRouteSnapshot): Observable<User> {
        console.log(this.auth.decodedToken.unique_name);
        return this.userService.getUser(this.auth.decodedToken.unique_name).pipe(
            catchError(error => {
                this.router.navigate(['/welcome']);
                return of(null);
            })
        );
    }
}
