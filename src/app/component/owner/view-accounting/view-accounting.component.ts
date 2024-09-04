import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-view-accounting',
    templateUrl: './view-accounting.component.html',
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        CurrencyPipe,
        RouterLink,
        NgForOf
    ],
    styleUrls: ['./view-accounting.component.css']
})
export class ManageAccountingComponent implements OnInit {
    accountings: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService) {
    }

    ngOnInit(): void {
        this.getAllAccounting();
    }

    // Fetch all accounting entries
    getAllAccounting(): void {
        this.loading = true;
        this.ownerService.getAccounting().subscribe(
            response => {
                this.loading = false;
                this.accountings = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load accounting entries. Please try again later.';
                console.error('Error fetching accounting entries:', error);
            }
        );
    }

    // Delete accounting entry by ID
    deleteAccounting(id: number): void {
        if (confirm('Are you sure you want to delete this accounting entry?')) {
            this.ownerService.deleteAccounting(id).subscribe(
                response => {
                    console.log('Accounting entry deleted successfully!', response);
                    this.getAllAccounting(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting accounting entry:', error);
                    this.errorMessage = 'Failed to delete accounting entry. Please try again later.';
                }
            );
        }
    }
}
