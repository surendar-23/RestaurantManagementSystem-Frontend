import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from "../../services/owner.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-restaurant',
    templateUrl: './update-restaurant.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
    styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
    idForm: FormGroup;
    restaurantForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    restaurantId: number | null = null;

    constructor(
        private userService: OwnerService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.idForm = this.fb.group({
            restaurantId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });

        this.restaurantForm = this.fb.group({
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

        this.restaurantId = +this.idForm.value.restaurantId;
        this.loadRestaurant();
    }

    loadRestaurant(): void {
        if (this.restaurantId === null) {
            this.errorMessage = 'Invalid restaurant ID.';
            return;
        }

        this.loading = true;
        this.userService.getUserById(this.restaurantId).subscribe({
            next: (data) => {
                this.restaurantForm.patchValue({
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
        if (this.restaurantForm.invalid) {
            return;
        }

        if (this.restaurantId === null) {
            this.errorMessage = 'Restaurant ID is not set.';
            return;
        }

        this.loading = true;
        const formValue = this.restaurantForm.value;
        const updatedRestaurant = {
            ...formValue,
            userId: this.restaurantId,
            firstName: formValue.name.split(' ')[0],
            lastName: formValue.name.split(' ')[1]
        };

        this.userService.updateUser(this.restaurantId, updatedRestaurant).subscribe({
            next: () => {
                this.loading = false;
                alert('Updated restaurant details successfully'); // Show alert
                setTimeout(() => this.router.navigate(['/restaurant/manage-restaurants']), 2000);
            },
            error: (err) => {
                this.errorMessage = 'Error updating restaurant details.';
                this.loading = false;
            }
        });
    }
}
