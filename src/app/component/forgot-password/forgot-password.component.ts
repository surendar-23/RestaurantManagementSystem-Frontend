import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    verificationForm: FormGroup;
    newPasswordForm: FormGroup;
    step: number = 1; // Controls the step of the process (1: Email, 2: Verify, 3: Reset)

    userDetails: any;  // To store the retrieved user details
    userId: string | undefined;

    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
        // Email form (step 1)
        this.forgotPasswordForm = this.fb.group({
            emailId: ['', [Validators.required, Validators.email]]
        });

        // Verification form (step 2)
        this.verificationForm = this.fb.group({
            phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            role: ['', Validators.required]
        });

        // New password form (step 3)
        this.newPasswordForm = this.fb.group({
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // Step 1: Submit email to retrieve user details
    submitEmail() {
        const emailId = this.forgotPasswordForm.get('emailId')?.value;

        this.http.post<any>('http://localhost:8080/api/users/forgotpassword', {emailId})
            .subscribe(response => {
                if (response && response.userId) {
                    this.userDetails = response;  // Store user details from the backend response
                    this.userId = response.userId;  // Store userId for later use
                    this.step = 2;  // Move to step 2: verification
                } else {
                    alert('Email not found!');
                }
            }, error => {
                console.error('Error:', error);
                alert('There was an error processing your request.');
            });
    }

    // Step 2: Verify user details by comparing them with retrieved data
    verifyDetails() {
        const {phoneNumber, role} = this.verificationForm.value;

        if (this.userDetails.phoneNumber === phoneNumber &&
            this.userDetails.role === role) {
            // If details match, proceed to reset password
            this.step = 3;
        } else {
            alert('Verification failed. Details do not match.');
        }
    }

    // Step 3: Submit new password to the backend
    resetPassword() {
        const {newPassword, confirmPassword} = this.newPasswordForm.value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (this.userId) {
            this.http.post<any>(`http://localhost:8080/api/users/${this.userId}/${newPassword}`, {})
                .subscribe(response => {
                    alert('Password reset successful!');
                    this.router.navigate(['/user-login']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });  // Redirect to login page after success
                }, error => {
                    console.error('Password reset error:', error);
                    alert('There was an error resetting your password. Please try again.');
                });
        }
    }
}
