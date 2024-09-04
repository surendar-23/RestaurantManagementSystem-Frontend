import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {NgIf, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-view-inventory-items',
    standalone: true,
    imports: [NgIf, NgForOf, RouterLink],
    templateUrl: './view-inventory-items.component.html',
    styleUrls: ['./view-inventory-items.component.css']
})
export class ManageInventoryItemsComponent implements OnInit {
    inventoryItems: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService) {
    }

    ngOnInit(): void {
        this.getAllInventoryItems();
    }

    // Fetch all inventory items
    getAllInventoryItems(): void {
        this.loading = true;
        this.ownerService.getInventoryItem().subscribe(
            response => {
                this.loading = false;
                this.inventoryItems = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load inventory items. Please try again later.';
                console.error('Error fetching inventory items:', error);
            }
        );
    }

    // Delete inventory item by ID
    deleteInventoryItem(id: number): void {
        if (confirm('Are you sure you want to delete this inventory item?')) {
            this.ownerService.deleteInventoryItem(id).subscribe(
                response => {
                    console.log('Inventory item deleted successfully!', response);
                    this.getAllInventoryItems(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting inventory item:', error);
                    this.errorMessage = 'Failed to delete inventory item. Please try again later.';
                }
            );
        }
    }
}
