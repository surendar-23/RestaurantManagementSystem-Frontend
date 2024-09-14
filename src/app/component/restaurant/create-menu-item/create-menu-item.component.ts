import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {MenuItem} from '../../model/menuItem';
import {User} from '../../model/user';
import {Category} from '../../model/category';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-create-menu-item',
    templateUrl: './create-menu-item.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./create-menu-item.component.css']
})
export class CreateMenuItemComponent {
    menuItem: MenuItem = new MenuItem();
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;
    categories: Category[] = []; // List of categories for dropdown
    restaurants: User[] = []; // List of restaurants for dropdown

    selectedCategoryId: number | undefined;
    selectedRestaurantId: number | undefined;

    constructor(private ownerService: OwnerService) {
        this.loadCategories();
        this.loadRestaurants();
    }

    createMenuItem() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        // Set the menuItem properties using the selected IDs
        this.menuItem.category = this.categories.find(cat => cat.id === this.selectedCategoryId);
        this.menuItem.restaurant = this.restaurants.find(rest => rest.userId === this.selectedRestaurantId);

        this.ownerService.createMenuItem(this.menuItem).subscribe(
            (response) => {
                this.successMessage = 'Menu item created successfully!';
                this.loading = false;
                this.menuItem = new MenuItem(); // Reset form
                this.selectedCategoryId = undefined;
                this.selectedRestaurantId = undefined;
            },
            (error) => {
                this.errorMessage = 'Failed to create menu item. Please try again.';
                this.loading = false;
            }
        );
    }

    private loadCategories() {
        this.ownerService.getCategory().subscribe(
            response => {
                this.categories = response;
            },
            error => {
                console.error('Error loading categories:', error);
            }
        );
    }

    private loadRestaurants() {
        this.ownerService.getRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error loading restaurants:', error);
            }
        );
    }
}
