import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {WaiterService} from "../../services/waiter.service";

@Component({
    selector: 'app-update-order-status',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './update-order-status.component.html',
    styleUrls: ['./update-order-status.component.css']  // Fixed here
})
export class UpdateOrderStatusComponent implements OnInit {
    orderForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private wService: WaiterService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.orderForm = this.fb.group({
            orderId: [null, [Validators.required, Validators.min(1)]],
            orderDate: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(1)]],
        });

        // Listen for changes to the orderId field
        this.orderForm.get('orderId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadOrderItem(id);
            }
        });
    }

    loadOrderItem(id: number) {
        this.wService.getOrderById(id).subscribe(
            (order) => {
                // Convert the date to the required format
                const formattedDate = new Date(order.orderDate).toISOString().split('T')[0];
                this.orderForm.patchValue({
                    orderDate: formattedDate,
                    total: order.total,
                });
            },
            (error) => {
                console.error('Error loading order:', error);
                this.orderForm.reset({
                    orderId: id,
                    orderDate: '',
                    total: 0
                });
                alert('Order not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.orderForm.valid) {
            const updateData = this.orderForm.value;
            const itemId = updateData.orderId;
            this.wService.updateOrder(updateData, itemId).subscribe(
                () => {
                    alert('Order updated successfully!');
                    this.router.navigate(['/delivery-partner/view-assigned-orders']).then(success => {
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
                    console.error('Error updating order :', error);
                    alert('Error updating order.');
                }
            );
        }
    }
}
