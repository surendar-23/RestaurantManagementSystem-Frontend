import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'app-update-waiter',
    templateUrl: './update-waiter.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./update-waiter.component.css']
})
export class UpdateWaiterComponent implements OnInit {
    idForm: FormGroup;
    waiterForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    waiterId: number | null = null;

    constructor(
        private userService: OwnerService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.idForm = this.fb.group({
            waiterId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });

        this.waiterForm = this.fb.group({
            name: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            address: ['', [Validators.required]],
            district: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            emailId: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit(): void {
    }

    onIdSubmit(): void {
        if (this.idForm.invalid) {
            return;
        }

        this.waiterId = +this.idForm.value.waiterId;
        this.loadWaiter();
    }

    loadWaiter(): void {
        if (this.waiterId === null) {
            this.errorMessage = 'Invalid restaurant ID.';
            return;
        }

        this.loading = true;
        this.userService.getUserById(this.waiterId).subscribe({
            next: (data) => {
                this.waiterForm.patchValue({
                    name: `${data.firstName} ${data.lastName}`,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    district: data.district,
                    state: data.state,
                    zipCode: data.zipCode,
                    emailId: data.emailId,
                    password: data.password
                });
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error loading restaurant details.';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.waiterForm.invalid) {
            return;
        }

        if (this.waiterId === null) {
            this.errorMessage = 'Restaurant ID is not set.';
            return;
        }

        this.loading = true;
        const formValue = this.waiterForm.value;
        const updatedWaiter = {
            ...formValue,
            userId: this.waiterId,
            firstName: formValue.name.split(' ')[0],
            lastName: formValue.name.split(' ')[1]
        };

        this.userService.updateUser(this.waiterId, updatedWaiter).subscribe({
            next: () => {
                this.loading = false;
                alert('Updated waiter details successfully'); // Show alert
                setTimeout(() => this.router.navigate(['/restaurant/manage-waiters']), 2000);
            },
            error: (err) => {
                this.errorMessage = 'Error updating restaurant details.';
                this.loading = false;
            }
        });
    }
}