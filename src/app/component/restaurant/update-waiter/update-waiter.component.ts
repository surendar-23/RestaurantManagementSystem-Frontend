import {Component} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-update-waiter',
    templateUrl: './update-waiter.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-waiter.component.css']
})
export class UpdateWaiterComponent {
    waiterId: number | undefined;
    waiter: any | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Waiter Details by ID
    fetchWaiterDetails(): void {
        if (this.waiterId) {
            this.loading = true;
            this.ownerService.getWaiterById(this.waiterId).subscribe(
                response => {
                    this.loading = false;
                    this.waiter = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load waiter details. Please try again later.';
                    console.error('Error fetching waiter details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Waiter ID.';
        }
    }

    // Update Waiter
    updateWaiter(): void {
        if (this.waiter && this.waiter.id) {
            this.ownerService.updateWaiter(this.waiter, this.waiter.id).subscribe(
                response => {
                    console.log('Waiter updated successfully!', response);
                    alert('Waiter updated successfully!');
                    this.router.navigate(['/restaurant/manage-waiters']).then(success => {
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
                    this.errorMessage = 'Failed to update waiter. Please try again later.';
                    console.error('Error updating waiter:', error);
                }
            );
        }
    }
}
