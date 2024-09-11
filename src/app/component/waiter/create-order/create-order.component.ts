import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WaiterService} from '../../services/waiter.service';

@Component({
    selector: 'app-create-order',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
    orderForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private waiterService: WaiterService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.orderForm = this.fb.group({
            orderDate: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(1)]],
            customerId: [null, [Validators.required, Validators.min(1)]],
            restaurantId: [null, [Validators.required, Validators.min(1)]],
            tableId: [null, [Validators.required, Validators.min(1)]],
            waiterId: [null, [Validators.required, Validators.min(1)]]
        });
    }

    onSubmit() {
        if (this.orderForm.valid) {
            this.waiterService.createOrder(this.orderForm.value).subscribe(
                (response) => {
                    alert('Order created successfully!');
                    this.router.navigate(['/waiter/view-current-orders']).then(success => {
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
                    console.error('Error creating order:', error);
                    alert('Error creating order.');
                }
            );
        } else {
            alert('Please fill all required fields.');
        }
    }
}
