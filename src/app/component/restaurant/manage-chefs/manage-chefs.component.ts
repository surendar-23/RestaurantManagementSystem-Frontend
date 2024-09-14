import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-manage-chefs',
    templateUrl: './manage-chefs.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./manage-chefs.component.css']
})
export class ManageChefsComponent implements OnInit {
    chefs: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllChefs();
    }

    // Fetch all chefs
    getAllChefs(): void {
        this.loading = true;
        this.ownerService.getChefs().subscribe(
            response => {
                this.loading = false;
                this.chefs = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load chefs. Please try again later.';
                console.error('Error fetching chefs:', error);
            }
        );
    }

    // Delete chef by ID
    deleteChef(id: number): void {
        if (confirm('Are you sure you want to delete this chef?')) {
            this.ownerService.deleteUser(id).subscribe(
                response => {
                    console.log('Chef deleted successfully!', response);
                    this.getAllChefs(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting chef:', error);
                    this.errorMessage = 'Failed to delete chef. Please try again later.';
                }
            );
        }
    }
}
