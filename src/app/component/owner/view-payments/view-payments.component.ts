import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-view-payments',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        DatePipe,
        CurrencyPipe
    ],
    templateUrl: './view-payments.component.html',
    styleUrls: ['./view-payments.component.css']
})
export class ManagePaymentsComponent implements OnInit {
    payments: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadPayments();
    }

    // Fetch all payments
    loadPayments(): void {
        this.loading = true;
        this.ownerService.getPayment().subscribe(
            (response) => {
                this.loading = false;
                this.payments = response;
            },
            (error) => {
                this.loading = false;
                this.errorMessage = 'Failed to load payments. Please try again later.';
                console.error('Error fetching payments:', error);
            }
        );
    }

    // Delete payment by ID
    deletePayment(id: number): void {
        if (confirm('Are you sure you want to delete this payment?')) {
            this.ownerService.deletePayment(id).subscribe(
                () => {
                    console.log('Payment deleted successfully!');
                    this.loadPayments(); // Refresh the list after deletion
                },
                (error) => {
                    console.error('Error deleting payment:', error);
                    this.errorMessage = 'Failed to delete payment. Please try again later.';
                }
            );
        }
    }
}
