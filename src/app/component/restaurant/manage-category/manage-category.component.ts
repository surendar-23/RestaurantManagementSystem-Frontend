import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-manage-categories',
    templateUrl: './manage-category.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
    categories: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    // Fetch all categories
    getAllCategories(): void {
        this.loading = true;
        this.ownerService.getCategory().subscribe(
            response => {
                this.loading = false;
                this.categories = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load categories. Please try again later.';
                console.error('Error fetching categories:', error);
            }
        );
    }

    // Delete category by ID
    deleteCategory(id: number): void {
        if (confirm('Are you sure you want to delete this category?')) {
            this.ownerService.deleteCategory(id).subscribe(
                response => {
                    console.log('Category deleted successfully!', response);
                    this.getAllCategories(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting category:', error);
                    this.errorMessage = 'Failed to delete category. Please try again later.';
                }
            );
        }
    }
}
