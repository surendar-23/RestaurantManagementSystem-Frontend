import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {User} from '../../model/user';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Table} from "../../model/table";

@Component({
    selector: 'app-create-table',
    templateUrl: './create-table.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent {
    table: Table = new Table();
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;
    restaurants: User[] = [];

    selectedRestaurantId: number | undefined;

    constructor(private ownerService: OwnerService) {
        this.loadRestaurants();
    }

    createTable() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        // Set the menuItem properties using the selected IDs
        this.table.restaurant = this.restaurants.find(rest => rest.userId === this.selectedRestaurantId);

        this.ownerService.createTable(this.table).subscribe(
            (response) => {
                this.successMessage = 'Table created successfully!';
                this.loading = false;
                this.table = new Table(); // Reset form
                this.selectedRestaurantId = undefined;
            },
            (error) => {
                this.errorMessage = 'Failed to create table. Please try again.';
                this.loading = false;
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