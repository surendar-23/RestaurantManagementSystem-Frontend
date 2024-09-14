import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WaiterService} from '../../services/waiter.service';
import {Table} from '../../model/table';
import {User} from '../../model/user';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-update-order-status',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    templateUrl: './update-order-status.component.html',
    styleUrls: ['./update-order-status.component.css']
})
export class UpdateOrderStatusComponent implements OnInit {
    orderForm!: FormGroup;
    tables: Table[] = [];
    customers: User[] = [];
    restaurants: User[] = [];
    waiters: User[] = [];

    constructor(
        private fb: FormBuilder,
        private wService: WaiterService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadTables();
        this.loadWaiters();
        this.loadRestaurants();
        this.loadCustomers();
    }

    initializeForm() {
        this.orderForm = this.fb.group({
            orderId: [null, [Validators.required, Validators.min(1)]],
            orderDate: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(1)]],
            customerId: [null, [Validators.required]],
            restaurantId: [null, [Validators.required]],
            tableId: [null, Validators.required],
            waiterId: [null, Validators.required]
        });

        this.orderForm.get('orderId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadOrderItem(id);
            }
        });
    }

    loadOrderItem(id: number) {
        this.wService.getOrderById(id).subscribe(
            (order) => {
                const formattedDate = new Date(order.orderDate).toISOString().split('T')[0];
                this.orderForm.patchValue({
                    orderDate: formattedDate,
                    total: order.total,
                    customerId: order.customerId,
                    restaurantId: order.restaurantId,
                    tableId: order.tableId,
                    waiterId: order.waiterId
                });
            },
            (error) => {
                console.error('Error loading order:', error);
                this.orderForm.reset({
                    orderId: id,
                    orderDate: '',
                    total: 0,
                    customerId: null,
                    restaurantId: null,
                    tableId: null,
                    waiterId: null
                });
                alert('Order not found or error occurred.');
            }
        );
    }

    loadTables() {
        this.wService.getTables().subscribe(
            (tables) => {
                this.tables = tables;
            },
            (error) => {
                console.error('Error loading tables:', error);
            }
        );
    }

    loadWaiters() {
        this.wService.getWaiters().subscribe(
            (waiters) => {
                this.waiters = waiters;
            },
            (error) => {
                console.error('Error loading waiters:', error);
            }
        );
    }

    private loadCustomers() {
        this.wService.getCustomers().subscribe(
            response => {
                this.customers = response;
            },
            error => {
                console.error('Error loading customers:', error);
            }
        );
    }

    private loadRestaurants() {
        this.wService.getRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error loading restaurants:', error);
            }
        );
    }

    onSubmit() {
        if (this.orderForm.valid) {
            const updateData = this.orderForm.value;
            this.wService.updateOrder(updateData, updateData.orderId).subscribe(
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
                    console.error('Error updating order:', error);
                    alert('Error updating order.');
                }
            );
        }
    }
}
