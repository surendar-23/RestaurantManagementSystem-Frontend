import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {Chef} from '../../model/chef'; // Assuming you have a Chef model

@Component({
    selector: 'app-update-chef',
    templateUrl: './update-chef.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-chef.component.css']
})
export class UpdateChefComponent {
    chefId: number | undefined;
    chef: Chef | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Chef Details by ID
    fetchChefDetails(): void {
        if (this.chefId) {
            this.loading = true;
            this.ownerService.getChefById(this.chefId).subscribe(
                response => {
                    this.loading = false;
                    this.chef = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load chef details. Please try again later.';
                    console.error('Error fetching chef details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Chef ID.';
        }
    }

    // Update Chef
    updateChef(): void {
        if (this.chef && this.chef.id) {
            this.ownerService.updateChef(this.chef, this.chef.id).subscribe(
                response => {
                    console.log('Chef updated successfully!', response);
                    alert('Chef updated successfully!');
                    this.router.navigate(['/restaurant/manage-chef']).then(success => {
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
                    this.errorMessage = 'Failed to update chef. Please try again later.';
                    console.error('Error updating chef:', error);
                }
            );
        }
    }
}
