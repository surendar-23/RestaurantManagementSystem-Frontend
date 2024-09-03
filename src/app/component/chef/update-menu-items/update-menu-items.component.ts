import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChefService} from '../../services/chef.service';
import {MenuItem} from "../../model/menuItem";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-menu-items',
    standalone: true,
    templateUrl: './update-menu-items.component.html',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./update-menu-items.component.css']
})
export class UpdateMenuItemsComponent {
    updateMenuItemForm: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private fb: FormBuilder, private chefService: ChefService) {
        this.updateMenuItemForm = this.fb.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]]
        });
    }

    getMenuItemById(): void {
        const menuItemId = this.updateMenuItemForm.get('id')?.value;
        if (menuItemId) {
            this.isLoading = true;
            this.chefService.getMenuItemById(menuItemId).subscribe(
                (menuItem: MenuItem) => {
                    this.updateMenuItemForm.patchValue({
                        name: menuItem.name,
                        price: menuItem.price
                    });
                    this.isLoading = false;
                },
                (error) => {
                    this.errorMessage = 'MenuItem not found. Please enter a valid ID.';
                    this.isLoading = false;
                }
            );
        }
    }

    onSubmit(): void {
        if (this.updateMenuItemForm.valid) {
            this.isLoading = true;
            const formData = this.updateMenuItemForm.value;
            this.chefService.updateMenuItem(formData, formData.id).subscribe(
                () => {
                    this.successMessage = 'MenuItem updated successfully!';
                    this.isLoading = false;
                },
                (error) => {
                    this.errorMessage = 'Failed to update MenuItem. Please try again.';
                    this.isLoading = false;
                }
            );
        }
    }
}
