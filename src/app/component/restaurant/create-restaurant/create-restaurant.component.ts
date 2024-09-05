import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-create-restaurant',
    templateUrl: './create-restaurant.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
    createRestaurantForm: FormGroup;
    addresses: any[] = [];
    owners: any[] = [];
    errorMessage: string | undefined;

    constructor(
        private fb: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
        this.createRestaurantForm = this.fb.group({
            restaurantName: ['', Validators.required],
            addressId: ['', Validators.required],
            ownerId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadAddresses();
        this.loadOwners();
    }

    // Load addresses to populate the dropdown
    loadAddresses(): void {
        this.ownerService.getAllAddress().subscribe(
            response => {
                this.addresses = response;
            },
            error => {
                console.error('Error loading addresses:', error);
                this.errorMessage = 'Failed to load addresses. Please try again later.';
            }
        );
    }

    // Load owners to populate the dropdown
    loadOwners(): void {
        this.ownerService.getAllRestaurants().subscribe(
            response => {
                this.owners = response;
            },
            error => {
                console.error('Error loading owners:', error);
                this.errorMessage = 'Failed to load owners. Please try again later.';
            }
        );
    }

    // Handle form submission
    onSubmit(): void {
        if (this.createRestaurantForm.invalid) {
            return;
        }

        const restaurantData = {
            name: this.createRestaurantForm.value.restaurantName,
            address: {id: this.createRestaurantForm.value.addressId},
            owner: {id: this.createRestaurantForm.value.ownerId}
        };

        this.ownerService.createRestaurant(restaurantData).subscribe(
            response => {
                console.log('Restaurant created successfully!', response);
                this.router.navigate(['/restaurant/manage-restaurants']).then(success => {
                    if (success) {
                        console.log('Navigation is successful!');
                    } else {
                        console.log('Navigation has failed!');
                    }
                }); // Redirect to the restaurant management page
            },
            error => {
                console.error('Error creating restaurant:', error);
                this.errorMessage = 'Failed to create restaurant. Please try again later.';
            }
        );
    }
}
