import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {InventoryItem} from "../../model/inventoryItem";
import {User} from "../../model/user";

@Component({
    selector: 'app-create-inventory-item',
    templateUrl: './create-inventory-item.component.html',
    standalone: true,
    imports: [FormsModule, NgForOf, NgIf],
    styleUrls: ['./create-inventory-item.component.css']
})
export class CreateInventoryItemComponent implements OnInit {
    inventoryItem: InventoryItem = new InventoryItem();
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;

    items: InventoryItem[] = []; // List of available items for dropdown
    restaurants: User[] = []; // List of restaurants for dropdown
    suppliers: User[] = []; // List of suppliers for dropdown

    selectedItemId: number | undefined;
    selectedRestaurantId: number | undefined;
    selectedSupplierId: number | undefined;

    constructor(private ownerService: OwnerService) {
    }

    ngOnInit(): void {
        this.loadItems();
        this.loadRestaurants();
        this.loadSuppliers();
    }

    createInventoryItem(): void {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        // Ensure that restaurant and supplier objects are initialized
        if (!this.inventoryItem.restaurant) {
            this.inventoryItem.restaurant = {userId: 0} as User;
        }
        if (!this.inventoryItem.supplier) {
            this.inventoryItem.supplier = {userId: 0} as User;
        }

        // Assign selected IDs to the inventoryItem
        this.inventoryItem.id = this.selectedItemId;
        this.inventoryItem.restaurant.userId = this.selectedRestaurantId ?? 0;
        this.inventoryItem.supplier.userId = this.selectedSupplierId ?? 0;

        this.ownerService.createInventoryItem(this.inventoryItem).subscribe(
            (response) => {
                this.successMessage = 'Inventory item created successfully!';
                this.loading = false;
                this.inventoryItem = new InventoryItem(); // Reset form
                this.selectedItemId = undefined;
                this.selectedRestaurantId = undefined;
                this.selectedSupplierId = undefined;
            },
            (error) => {
                this.errorMessage = 'Failed to create inventory item. Please try again.';
                this.loading = false;
            }
        );
    }

    private loadItems(): void {
        this.ownerService.getInventoryItem().subscribe(
            (response) => {
                this.items = response;
            },
            (error) => {
                console.error('Error loading items:', error);
            }
        );
    }

    private loadRestaurants(): void {
        this.ownerService.getRestaurants().subscribe(
            (response) => {
                this.restaurants = response;
            },
            (error) => {
                console.error('Error loading restaurants:', error);
            }
        );
    }

    private loadSuppliers(): void {
        this.ownerService.getSuppliers().subscribe(
            (response) => {
                this.suppliers = response;
            },
            (error) => {
                console.error('Error loading suppliers:', error);
            }
        );
    }
}
