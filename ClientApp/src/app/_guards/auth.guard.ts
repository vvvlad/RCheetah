import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private snack: MatSnackBar) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            this.snack.open('Access Denied', 'Need to be logged-in to access', {duration: 4000, panelClass: ['snack-bar-color-error']});
            return false;
        }
    }
}
