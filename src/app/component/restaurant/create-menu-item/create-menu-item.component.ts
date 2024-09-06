import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {MenuItem} from "../../model/menuItem";
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
    categories: any[] = []; // List of categories for dropdown
    restaurants: any[] = []; // List of restaurants for dropdown

    constructor(private ownerService: OwnerService) {
        this.loadCategories();
        this.loadRestaurants();
    }

    createMenuItem() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        this.ownerService.createMenuItem(this.menuItem).subscribe(
            (response) => {
                this.successMessage = 'Menu item created successfully!';
                this.loading = false;
                this.menuItem = new MenuItem(); // Reset form
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
        this.ownerService.getAllRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error loading restaurants:', error);
            }
        );
    }
}
