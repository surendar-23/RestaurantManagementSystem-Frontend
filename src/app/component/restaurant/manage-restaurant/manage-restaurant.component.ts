// manage-restaurant.component.ts
import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-manage-restaurant',
    templateUrl: './manage-restaurant.component.html',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        NgForOf
    ],
    styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit {
    restaurants: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllRestaurants();
    }

    // Fetch all restaurants and filter by role "restaurant"
    getAllRestaurants(): void {
        this.loading = true;
        this.ownerService.getAllRestaurants().subscribe(
            (response: any[]) => {
                this.loading = false;
                // Filter users with role = 'restaurant'
                this.restaurants = response.filter(user => user.role === 'restaurant');
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load restaurants. Please try again later.';
                console.error('Error fetching restaurants:', error);
            }
        );
    }

    // Delete restaurant by ID
    deleteRestaurant(id: number): void {
        if (confirm('Are you sure you want to delete this restaurant?')) {
            this.ownerService.deleteUser(id).subscribe(
                response => {
                    console.log('Restaurant deleted successfully!', response);
                    this.getAllRestaurants(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting restaurant:', error);
                    this.errorMessage = 'Failed to delete restaurant. Please try again later.';
                }
            );
        }
    }
}
