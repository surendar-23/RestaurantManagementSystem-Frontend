import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-chef',
    templateUrl: './create-chef.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
    styleUrls: ['./create-chef.component.css']
})
export class CreateChefComponent {
    chef = {
        name: '',
        experience: 0,
        restaurantId: 0
    };
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    createChef() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        this.ownerService.createChef(this.chef).subscribe(
            (response) => {
                this.successMessage = 'Chef created successfully!';
                this.loading = false;
                this.chef = {name: '', experience: 0, restaurantId: 0}; // Reset form
                // Optionally navigate to another page
                this.router.navigate(['/chefs']);
            },
            (error) => {
                this.errorMessage = 'Failed to create chef. Please try again.';
                this.loading = false;
            }
        );
    }
}
