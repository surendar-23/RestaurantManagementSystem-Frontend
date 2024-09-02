import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from "../../services/supplier.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-update-inventory-item',
    templateUrl: './update-inventory-item.component.html',
    styleUrls: ['./update-inventory-item.component.css'],
    imports: [
        ReactiveFormsModule
    ],
    standalone: true
})
export class UpdateInventoryItemComponent implements OnInit {
    inventoryItemForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private supplierService: SupplierService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.inventoryItemForm = this.fb.group({
            inventoryItemId: [null, Validators.required],  // Ensure this field is initialized
            name: ['', Validators.required],
            quantity: [0, [Validators.required, Validators.min(1)]],
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
            (item) => {
                // Update form with retrieved item details
                this.inventoryItemForm.patchValue({
                    name: item.name,
                    quantity: item.quantity,
                });
            },
            (error) => {
                console.error('Error loading inventory item:', error);
                this.inventoryItemForm.reset({
                    inventoryItemId: id,  // Keep the ID in the form, reset the others
                    name: '',
                    quantity: 0
                });
                alert('Inventory item not found or error occurred.');
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
                    this.router.navigate(['/supplier']).then(success => {
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
