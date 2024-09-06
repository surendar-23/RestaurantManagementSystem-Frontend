import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {Category} from "../../model/category";

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
    categoryId: number | undefined;
    category: Category | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Category Details by ID
    fetchCategoryDetails(): void {
        if (this.categoryId) {
            this.loading = true;
            this.ownerService.getCategoryById(this.categoryId).subscribe(
                response => {
                    this.loading = false;
                    this.category = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load category details. Please try again later.';
                    console.error('Error fetching category details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Category ID.';
        }
    }

    // Update Category
    updateCategory(): void {
        if (this.category && this.category.id) {
            this.ownerService.updateCategory(this.category, this.category.id).subscribe(
                response => {
                    console.log('Category updated successfully!', response);
                    alert('Category updated successfully!');
                    this.router.navigate(['/restaurant/manage-category']).then(success => {
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
                    this.errorMessage = 'Failed to update category. Please try again later.';
                    console.error('Error updating category:', error);
                }
            );
        }
    }
}
