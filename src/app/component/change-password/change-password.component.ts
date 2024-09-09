import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestaurantService} from '../services/restaurant.service';
import {take} from 'rxjs/operators';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    imports: [
        FormsModule
    ],
    standalone: true
})
export class ChangePasswordComponent implements OnInit {
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';
    userId: string | null = ''; // User ID, fetched from storage or injected

    constructor(private router: Router, private rService: RestaurantService) {
    }

    ngOnInit(): void {
        this.userId = localStorage.getItem('userId'); // You can modify this depending on how you store the user ID
        if (!this.userId) {
            alert('User not logged in.');
            this.router.navigate(['/user-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    changePassword(): void {
        if (!this.userId) {
            alert('No user ID found.');
            return;
        }

        if (this.oldPassword === '' || this.newPassword === '' || this.confirmPassword === '') {
            alert('All fields are required.');
            return;
        }

        if (this.newPassword.length < 8 || !/[A-Z]/.test(this.newPassword) || !/[0-9]/.test(this.newPassword)) {
            alert('Password must be at least 8 characters, contain one uppercase letter, and one digit.');
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            alert('New password and confirmation password do not match.');
            return;
        }

        if (this.newPassword === this.oldPassword) {
            alert('New password cannot be the same as the old password.');
            return;
        }

        // Call the service method with user ID and new password
        this.rService.changePassword(this.userId, this.newPassword).pipe(take(1)).subscribe(
            (res: any) => {
                if (res.success) {
                    alert('Password changed successfully!');
                    this.router.navigate(['/user-login']).then(success => {
                        if (success) {
                            console.log('Navigation is successful!');
                        } else {
                            console.log('Navigation has failed!');
                        }
                    })
                        .catch(err => {
                            console.error('Navigation error:', err);
                        }); // Redirect to profile or appropriate page
                }
            },
            (err) => {
                alert('Error changing password. Please try again.');
            }
        );
    }
}
