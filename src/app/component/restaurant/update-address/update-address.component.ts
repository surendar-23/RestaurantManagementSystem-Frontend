import {Component} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-update-address',
    templateUrl: './update-address.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {
    addressId: number | undefined;
    address: any | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;
    successMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Address Details by ID
    fetchAddressDetails(): void {
        if (this.addressId) {
            this.loading = true;
            this.ownerService.getAddressById(this.addressId).subscribe(
                response => {
                    this.loading = false;
                    this.address = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load address details. Please try again later.';
                    console.error('Error fetching address details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Address ID.';
        }
    }

    // Update Address
    updateAddress(): void {
        if (this.address && this.address.id) {
            this.ownerService.updateAddress(this.address, this.address.id).subscribe(
                response => {
                    this.successMessage = 'Address updated successfully!';
                    alert(this.successMessage);
                    this.router.navigate(['/owner/manage-address']).then(success => {
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
                    this.errorMessage = 'Failed to update address. Please try again later.';
                    console.error('Error updating address:', error);
                }
            );
        }
    }
}
