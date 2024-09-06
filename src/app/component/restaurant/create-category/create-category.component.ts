// create-category.component.ts
import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Category} from "../../model/category";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
    category: Category = new Category();
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;

    constructor(private ownerService: OwnerService) {
    }

    createCategory() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        this.ownerService.createCategory(this.category).subscribe(
            (response) => {
                this.successMessage = 'Category created successfully!';
                this.loading = false;
                this.category = new Category(); // Reset form
            },
            (error) => {
                this.errorMessage = 'Failed to create category. Please try again.';
                this.loading = false;
            }
        );
    }
}
