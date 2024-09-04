import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-view-bill',
    templateUrl: './view-bill.component.html',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        DatePipe,
        CurrencyPipe,
        NgForOf
    ],
    styleUrls: ['./view-bill.component.css']
})
export class ManageBillComponent implements OnInit {
    bills: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService) {
    }

    ngOnInit(): void {
        this.getAllBills();
    }

    // Fetch all bills
    getAllBills(): void {
        this.loading = true;
        this.ownerService.getBill().subscribe(
            response => {
                this.loading = false;
                this.bills = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load bills. Please try again later.';
                console.error('Error fetching bills:', error);
            }
        );
    }

    // Delete bill by ID
    deleteBill(id: number): void {
        if (confirm('Are you sure you want to delete this bill?')) {
            this.ownerService.deleteBill(id).subscribe(
                response => {
                    console.log('Bill deleted successfully!', response);
                    this.getAllBills(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting bill:', error);
                    this.errorMessage = 'Failed to delete bill. Please try again later.';
                }
            );
        }
    }
}
