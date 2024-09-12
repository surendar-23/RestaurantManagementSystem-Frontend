import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

interface Bill {
    id: number;
    date: Date;
    amount: number;
    description: string;
}

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
    bills: Bill[] = [];
    loading: boolean = false;
    errorMessage?: string;

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
                this.bills = response;
                this.loading = false;
            },
            error => {
                this.errorMessage = 'Failed to load bills. Please try again later.';
                console.error('Error fetching bills:', error);
                this.loading = false;
            }
        );
    }

    // Delete bill by ID
    deleteBill(id: number): void {
        if (confirm('Are you sure you want to delete this bill?')) {
            this.ownerService.deleteBill(id).subscribe(
                () => {
                    this.getAllBills(); // Refresh the list after deletion
                    console.log('Bill deleted successfully!');
                },
                error => {
                    this.errorMessage = 'Failed to delete bill. Please try again later.';
                    console.error('Error deleting bill:', error);
                }
            );
        }
    }
}
