// src/app/auth.guard.ts
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./component/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            // Prevent redirection to '/login' if already on '/login'
            if (this.router.url !== '/user-login') {
                this.router.navigate(['/user-login']).then(success => {
                    if (success) {
                        console.log('Navigation successful!');
                    } else {
                        console.log('Navigation failed!');
                    }
                }).catch(err => {
                    console.error('Navigation error:', err);
                });
            }
            return false;
        }
    }
}
