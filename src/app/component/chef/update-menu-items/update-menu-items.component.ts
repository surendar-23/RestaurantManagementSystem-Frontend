import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChefService} from '../../services/chef.service';
import {MenuItem} from "../../model/menuItem";
import {Category} from "../../model/category";
import {User} from "../../model/user";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-update-menu-items',
    standalone: true,
    templateUrl: './update-menu-items.component.html',
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./update-menu-items.component.css']
})
export class UpdateMenuItemsComponent {
    updateMenuItemForm: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';
    categories: Category[] = []; // List of categories for dropdown
    restaurants: User[] = []; // List of restaurants for dropdown

    constructor(
        private fb: FormBuilder,
        private chefService: ChefService,
        private router: Router
    ) {
        this.updateMenuItemForm = this.fb.group({
            id: ['', [Validators.required, Validators.min(1)]],
            name: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            categoryId: ['', Validators.required],
            restaurantId: ['', Validators.required]
        });

        this.loadCategories();
        this.loadRestaurants();
    }

    getMenuItemById(): void {
        const menuItemId = this.updateMenuItemForm.get('id')?.value;
        if (menuItemId) {
            this.isLoading = true;
            this.chefService.getMenuItemById(menuItemId).subscribe(
                (menuItem: MenuItem) => {
                    this.updateMenuItemForm.patchValue({
                        name: menuItem.name,
                        price: menuItem.price,
                        categoryId: menuItem.category?.id,
                        restaurantId: menuItem.restaurant?.userId
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
                    this.router.navigate(['/chef/view-menu-items']).then(success => {
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
                    this.errorMessage = 'Failed to update MenuItem. Please try again.';
                    this.isLoading = false;
                }
            );
        }
    }

    private loadCategories() {
        this.chefService.getCategory().subscribe(
            response => {
                this.categories = response;
            },
            error => {
                console.error('Error loading categories:', error);
            }
        );
    }

    private loadRestaurants() {
        this.chefService.getRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error loading restaurants:', error);
            }
        );
    }
}
