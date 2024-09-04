import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-inventory-item',
    standalone: true,
    imports: [ReactiveFormsModule,
        NgIf],
    templateUrl: './create-inventory-item.component.html',
    styleUrl: './create-inventory-item.component.css'
})
export class CreateInventoryItemComponent implements OnInit {
    inventoryForm!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.inventoryForm = this.formBuilder.group({
            name: ['', Validators.required],
            quantity: [0, [Validators.required, Validators.min(1)]],
            restaurantId: [0, Validators.required],
            supplierId: [0, Validators.required]
        })
    }

    get f() {
        return this.inventoryForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.inventoryForm.invalid) {
            return;
        }

        const inventoryData = {
            name: this.inventoryForm.value.name,
            quantity: this.inventoryForm.value.quantity,
            restaurant: {id: this.inventoryForm.value.restaurantId},
            supplier: {id: this.inventoryForm.value.supplierId}
        };

        this.ownerService.createInventoryItem(inventoryData).subscribe(
            response => {
                console.log("Inventory Item entry created successfully : ", response);
                this.router.navigate(['owner/view-inventory-items']).then(success => {
                    if (success) {
                        console.log('Navigation successful!');
                    } else {
                        console.log('Navigation failed!');
                    }
                }).catch(err => {
                    console.error('Navigation error:', err);
                });
            },
            error => {
                console.error("Error creating inventory entry: ", error);
            }
        );
    }
}
