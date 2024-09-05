import {Component} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-update-restaurant',
    templateUrl: './update-restaurant.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent {
    restaurantId: number | undefined;
    restaurant: any | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Restaurant Details by ID
    fetchRestaurantDetails(): void {
        if (this.restaurantId) {
            this.loading = true;
            this.ownerService.getRestaurantById(this.restaurantId).subscribe(
                response => {
                    this.loading = false;
                    this.restaurant = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load restaurant details. Please try again later.';
                    console.error('Error fetching restaurant details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Restaurant ID.';
        }
    }

    // Update Restaurant
    updateRestaurant(): void {
        if (this.restaurant && this.restaurant.id) {
            this.ownerService.updateRestaurant(this.restaurant, this.restaurant.id).subscribe(
                response => {
                    console.log('Restaurant updated successfully!', response);
                    alert('Restaurant updated successfully!');
                    this.router.navigate(['/restaurant/manage-restaurants']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    }); // Redirect to a different page if necessary
                },
                error => {
                    this.errorMessage = 'Failed to update restaurant. Please try again later.';
                    console.error('Error updating restaurant:', error);
                }
            );
        }
    }
}
