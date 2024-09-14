import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {DeliveryPartnerService} from '../../services/delivery-partner.service';
import {NgForOf} from "@angular/common";
import {Order} from "../../model/order";
import {User} from "../../model/user";

@Component({
    selector: 'app-create-delivery-task',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    templateUrl: './create-delivery-task.component.html',
    styleUrls: ['./create-delivery-task.component.css']
})
export class CreateDeliveryTaskComponent implements OnInit {
    deliveryForm!: FormGroup;
    orders: Order[] = []; // List of orders for the dropdown
    deliveryPartners: User[] = []; // List of delivery partners for the dropdown

    constructor(
        private fb: FormBuilder,
        private deliveryPartnerService: DeliveryPartnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadOrders();
        this.loadDeliveryPartners();
    }

    initializeForm() {
        this.deliveryForm = this.fb.group({
            deliveryTime: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            status: ['', Validators.required],
            orderId: [null, Validators.required],
            deliveryPartnerId: [null, Validators.required]
        });
    }

    loadOrders() {
        // Fetch the orders (replace with your actual service call)
        this.deliveryPartnerService.getOrders().subscribe(
            (response) => {
                this.orders = response;
            },
            (error) => {
                console.error('Error loading orders:', error);
            }
        );
    }

    loadDeliveryPartners() {
        // Fetch the delivery partners (replace with your actual service call)
        this.deliveryPartnerService.getDeliveryPartners().subscribe(
            (response) => {
                this.deliveryPartners = response;
            },
            (error) => {
                console.error('Error loading delivery partners:', error);
            }
        );
    }

    onSubmit() {
        if (this.deliveryForm.valid) {
            this.deliveryPartnerService.createDelivery(this.deliveryForm.value).subscribe(
                () => {
                    alert('Delivery task created successfully!');
                    this.router.navigate(['/delivery-partner/view-past-deliveries']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                },
                (error) => {
                    console.error('Error creating delivery task:', error);
                    alert('Error creating delivery task.');
                }
            );
        }
    }
}
