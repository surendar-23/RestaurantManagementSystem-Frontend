import {Component, OnInit} from "@angular/core";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.css'],
    standalone: true,
    providers: [DatePipe],
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ]
})
export class UserSignupComponent implements OnInit {

    userForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
        emailId: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
    });

    roles = [
        {value: 'chef', viewValue: 'Chef'},
        {value: 'customer', viewValue: 'Customer'},
        {value: 'delivery-partner', viewValue: 'Delivery Partner'},
        {value: 'supplier', viewValue: 'Supplier'},
        {value: 'waiter', viewValue: 'Waiter'}
    ];

    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.userForm.valid) {
            const user = this.userForm.value;

            this.http.post('http://localhost:8080/api/users/register', user)
                .subscribe(response => {
                    console.log(response);
                    this.router.navigate(['/user-login']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                }, error => {
                    console.error(error);
                });
        }
    }

    routeToLogin(): void {
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
}
