import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedInStatus: boolean = false;
    private userRole: string | null = null;

    constructor(private router: Router) {
    }

    // Set login status
    setLoggedIn(status: boolean): void {
        this.isLoggedInStatus = status;
    }

    // Check if the user is logged in
    isLoggedIn(): boolean {
        // Logic to check if the user is logged in
        return !!localStorage.getItem('token');  // Example logic using localStorage
    }

    // Set the user's role
    setUserRole(role: string): void {
        this.userRole = role;
    }

    // Get the user's role
    getUserRole(): string | null {
        return this.userRole;
    }

    // Login user
    login(credentials: any): void {
        // Simulate login logic and setting user role
        this.isLoggedInStatus = true;
        this.userRole = credentials.role; // Retrieve role from the backend
        this.router.navigate(['/home']).then((success) => {
            if (success) {
                console.log('Navigation is successful!');
            } else {
                console.log('Navigation has failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }

    // Implement other methods as needed
}
