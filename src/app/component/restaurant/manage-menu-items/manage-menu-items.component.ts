import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-manage-menu-items',
    templateUrl: './manage-menu-items.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink,
        CurrencyPipe
    ],
    styleUrls: ['./manage-menu-items.component.css']
})
export class ManageMenuItemsComponent implements OnInit {
    menuItems: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllMenuItems();
    }

    // Fetch all menu items
    getAllMenuItems(): void {
        this.loading = true;
        this.ownerService.getMenuItem().subscribe(
            response => {
                this.loading = false;
                this.menuItems = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load menu items. Please try again later.';
                console.error('Error fetching menu items:', error);
            }
        );
    }

    // Delete menu item by ID
    deleteMenuItem(id: number): void {
        if (confirm('Are you sure you want to delete this menu item?')) {
            this.ownerService.deleteMenuItem(id).subscribe(
                response => {
                    console.log('Menu item deleted successfully!', response);
                    this.getAllMenuItems(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting menu item:', error);
                    this.errorMessage = 'Failed to delete menu item. Please try again later.';
                }
            );
        }
    }
}
