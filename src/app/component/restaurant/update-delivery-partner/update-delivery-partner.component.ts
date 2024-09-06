import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {DeliveryPartner} from "../../model/deliveryPartner";

@Component({
    selector: 'app-update-delivery-partner',
    templateUrl: './update-delivery-partner.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./update-delivery-partner.component.css']
})
export class UpdateDeliveryPartnerComponent {
    deliveryPartnerId: number | undefined;
    deliveryPartner: DeliveryPartner | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    // Fetch Delivery Partner Details by ID
    fetchDeliveryPartnerDetails(): void {
        if (this.deliveryPartnerId) {
            this.loading = true;
            this.ownerService.getDeliveryPartnerById(this.deliveryPartnerId).subscribe(
                response => {
                    this.loading = false;
                    this.deliveryPartner = response;
                },
                error => {
                    this.loading = false;
                    this.errorMessage = 'Failed to load delivery partner details. Please try again later.';
                    console.error('Error fetching delivery partner details:', error);
                }
            );
        } else {
            this.errorMessage = 'Please enter a valid Delivery Partner ID.';
        }
    }

    // Update Delivery Partner
    updateDeliveryPartner(): void {
        if (this.deliveryPartner && this.deliveryPartner.id) {
            this.ownerService.updateDeliveryPartner(this.deliveryPartner, this.deliveryPartner.id).subscribe(
                response => {
                    console.log('Delivery partner updated successfully!', response);
                    alert('Delivery partner updated successfully!');
                    this.router.navigate(['/restaurant/manage-delivery-partner']).then(success => {
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
                    this.errorMessage = 'Failed to update delivery partner. Please try again later.';
                    console.error('Error updating delivery partner:', error);
                }
            );
        }
    }
}
