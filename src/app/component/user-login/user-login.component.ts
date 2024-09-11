import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
    imports: [
        FormsModule
    ],
    standalone: true
})
export class UserLoginComponent implements OnInit {
    errormessage: string = '';
    emailID: string = '';
    password: string = '';
    errormessagep: string = '';

    constructor(
        private route: Router,
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
    }

    login(): void {
        if (!this.validateInputs()) return;

        const body = {
            emailId: this.emailID,
            password: this.password,
        };

        this.userService.login(body).pipe(take(1)).subscribe(
            (res: any) => {
                if (res?.userId) {
                    alert('Login successful');
                    this.authService.setLoggedIn(true);
                    this.authService.setUserRole(res.role);

                    this.storeUserDetails(res);
                    this.navigateUser(res.role);
                }
            },
            (err: HttpErrorResponse) => {
                console.error('Login error:', err);
                this.handleError(err);
            }
        );
    }

    validateInputs(): boolean {
        this.errormessage = '';
        this.errormessagep = '';

        if (this.emailID === '' || !this.emailID.includes('@')) {
            this.errormessage = 'Please enter a valid email';
            return false;
        }
        if (this.password === '') {
            this.errormessagep = 'Please enter your password';
            return false;
        }
        return true;
    }

    storeUserDetails(res: any): void {
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userName', `${res.firstName} ${res.lastName}`);
    }

    navigateUser(role: string): void {
        const roleRoutes: { [key: string]: string } = {
            owner: '/owner/home',
            chef: '/chef/home',
            customer: '/customer/home',
            'delivery-partner': '/delivery-partner/home',
            restaurant: '/restaurant/home',
            supplier: '/supplier/home',
            waiter: '/waiter/home',
        };

        const routePath = roleRoutes[role] || '/';
        this.route.navigate([routePath]).catch(err => {
            console.error('Navigation error:', err);
        });
    }

    handleError(err: HttpErrorResponse): void {
        let errorMessage = 'Something went wrong during login. Please try again.';
        switch (err.status) {
            case 404:
                errorMessage = 'The requested resource was not found.';
                break;
            case 400:
                errorMessage = 'Bad request. Please check your input.';
                break;
            case 401:
                errorMessage = 'Unauthorized. Please check your credentials.';
                break;
            default:
                if (err.error && typeof err.error === 'string' && err.error.startsWith('User not found with')) {
                    errorMessage = 'User email/password is invalid';
                }
                break;
        }
        alert(errorMessage);
    }

    routeToNewUser(): void {
        this.route.navigate(['/user-signup']).catch(err => {
            console.error('Navigation error:', err);
        });
    }

    routeToForgotPassword(): void {
        this.route.navigate(['/forgot-password']).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
