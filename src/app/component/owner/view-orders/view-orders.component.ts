import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-view-orders',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgForOf
    ],
    templateUrl: './view-orders.component.html',
    styleUrls: ['./view-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
    orders: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllOrders();
    }

    // Fetch all orders
    getAllOrders(): void {
        this.loading = true;
        this.ownerService.getOrders().subscribe(
            response => {
                this.loading = false;
                this.orders = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load orders. Please try again later.';
                console.error('Error fetching orders:', error);
            }
        );
    }

    // Delete order by ID
    deleteOrder(id: number): void {
        if (confirm('Are you sure you want to delete this order?')) {
            this.ownerService.deleteOrder(id).subscribe(
                () => {
                    console.log('Order deleted successfully!');
                    this.getAllOrders(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting order:', error);
                    this.errorMessage = 'Failed to delete order. Please try again later.';
                }
            );
        }
    }
}
