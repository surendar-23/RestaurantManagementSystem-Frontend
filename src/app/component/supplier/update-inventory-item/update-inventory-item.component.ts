import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from "../../services/supplier.service";
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {InventoryItem} from "../../model/inventoryItem";
import {User} from "../../model/user";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-update-inventory-item',
    templateUrl: './update-inventory-item.component.html',
    styleUrls: ['./update-inventory-item.component.css'],
    imports: [
        ReactiveFormsModule,
        NgForOf
    ],
    standalone: true
})
export class UpdateInventoryItemComponent implements OnInit {
    inventoryItemForm!: FormGroup;
    restaurants: User[] = [];
    suppliers: User[] = [];

    constructor(
        private fb: FormBuilder,
        private supplierService: SupplierService,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadRestaurants();
        this.loadSuppliers();
    }

    initializeForm() {
        this.inventoryItemForm = this.fb.group({
            inventoryItemId: [null, Validators.required],
            name: ['', Validators.required],
            quantity: [0, [Validators.required, Validators.min(1)]],
            restaurantId: [null, Validators.required], // Add restaurant to form
            supplierId: [null, Validators.required] // Add supplier to form
        });

        // Listen for changes to the inventoryItemId field
        this.inventoryItemForm.get('inventoryItemId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadInventoryItem(id);
            }
        });
    }

    loadInventoryItem(id: number) {
        this.supplierService.getInventoryItemById(id).subscribe(
            (item: InventoryItem) => {
                // Update form with retrieved item details
                this.inventoryItemForm.patchValue({
                    name: item.name,
                    quantity: item.quantity,
                    restaurantId: item?.restaurant?.userId, // Assuming item has restaurant userId
                    supplierId: item?.supplier?.userId // Assuming item has supplier userId
                });
            },
            (error) => {
                console.error('Error loading inventory item:', error);
                this.inventoryItemForm.reset({
                    inventoryItemId: id,
                    name: '',
                    quantity: 0
                });
                alert('Inventory item not found or error occurred.');
            }
        );
    }

    loadRestaurants() {
        this.ownerService.getRestaurants().subscribe(
            (response) => {
                this.restaurants = response;
            },
            (error) => {
                console.error('Error loading restaurants:', error);
            }
        );
    }

    loadSuppliers() {
        this.ownerService.getSuppliers().subscribe(
            (response) => {
                this.suppliers = response;
            },
            (error) => {
                console.error('Error loading suppliers:', error);
            }
        );
    }

    onSubmit() {
        if (this.inventoryItemForm.valid) {
            const updateData = this.inventoryItemForm.value;
            const itemId = updateData.inventoryItemId;
            this.supplierService.updateInventoryItem(updateData, itemId).subscribe(
                () => {
                    alert('Inventory item updated successfully!');
                    this.router.navigate(['/chef/view-inventory-items']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                },
                (error) => {
                    console.error('Error updating inventory item:', error);
                    alert('Error updating inventory item.');
                }
            );
        }
    }
}
