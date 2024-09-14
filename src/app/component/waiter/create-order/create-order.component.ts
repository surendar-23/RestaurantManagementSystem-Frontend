import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WaiterService} from '../../services/waiter.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {User} from "../../model/user";

@Component({
    selector: 'app-create-order',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgForOf],
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
    orderForm!: FormGroup;
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;
    customers: User[] = [];
    restaurants: User[] = [];

    selectedCustomerId: number | undefined;
    selectedRestaurantId: number | undefined;

    constructor(
        private fb: FormBuilder,
        private waiterService: WaiterService,
        private router: Router
    ) {
        this.loadCustomers();
        this.loadRestaurants();
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.orderForm = this.fb.group({
            orderDate: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(1)]],
            customerId: [null, [Validators.required]],
            restaurantId: [null, [Validators.required]]
        });
    }

    createOrder() {
        if (this.orderForm.valid) {
            this.loading = true;
            this.successMessage = undefined;
            this.errorMessage = undefined;

            // Set the form values using the selected IDs
            this.orderForm.patchValue({
                customerId: this.selectedCustomerId,
                restaurantId: this.selectedRestaurantId
            });

            this.waiterService.createOrder(this.orderForm.value).subscribe(
                (response) => {
                    this.successMessage = 'Order created successfully!';
                    this.loading = false;
                    this.orderForm.reset(); // Reset form
                    this.selectedCustomerId = undefined;
                    this.selectedRestaurantId = undefined;
                },
                (error) => {
                    this.errorMessage = 'Failed to create order. Please try again.';
                    this.loading = false;
                }
            );
        } else {
            this.errorMessage = 'Please fill all required fields.';
        }
    }

    private loadCustomers() {
        this.waiterService.getCustomers().subscribe(
            response => {
                this.customers = response;
            },
            error => {
                console.error('Error loading customers:', error);
            }
        );
    }

    private loadRestaurants() {
        this.waiterService.getRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error loading restaurants:', error);
            }
        );
    }
}
