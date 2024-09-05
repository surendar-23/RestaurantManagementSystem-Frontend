import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service'; // Assuming this service handles API calls for waiters
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-manage-waiters',
    templateUrl: './manage-waiters.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./manage-waiters.component.css']
})
export class ManageWaitersComponent implements OnInit {
    waiters: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllWaiters();
    }

    // Fetch all waiters
    getAllWaiters(): void {
        this.loading = true;
        this.ownerService.getWaiters().subscribe(
            response => {
                this.loading = false;
                this.waiters = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load waiters. Please try again later.';
                console.error('Error fetching waiters:', error);
            }
        );
    }

    // Delete waiter by ID
    deleteWaiter(id: number): void {
        if (confirm('Are you sure you want to delete this waiter?')) {
            this.ownerService.deleteWaiter(id).subscribe(
                response => {
                    console.log('Waiter deleted successfully!', response);
                    this.getAllWaiters(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting waiter:', error);
                    this.errorMessage = 'Failed to delete waiter. Please try again later.';
                }
            );
        }
    }
}
