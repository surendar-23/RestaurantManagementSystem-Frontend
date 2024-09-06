import {Component} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-delivery-partner',
    templateUrl: './create-delivery-partner.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
    styleUrls: ['./create-delivery-partner.component.css']
})
export class CreateDeliveryPartnerComponent {
    deliveryPartner = {
        name: '',
        contactNumber: '',
        restaurantId: 0
    };
    successMessage: string | undefined;
    errorMessage: string | undefined;
    loading: boolean = false;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    createDeliveryPartner() {
        this.loading = true;
        this.successMessage = undefined;
        this.errorMessage = undefined;

        // Prepare the delivery partner data
        const deliveryPartnerData = {
            name: this.deliveryPartner.name,
            contactNumber: this.deliveryPartner.contactNumber,
            restaurant: {
                id: this.deliveryPartner.restaurantId
            }
        };

        this.ownerService.createDeliveryPartner(deliveryPartnerData).subscribe(
            (response) => {
                this.successMessage = 'Delivery partner created successfully!';
                this.loading = false;
                this.deliveryPartner = {name: '', contactNumber: '', restaurantId: 0}; // Reset form
                // Optionally navigate to another page
                this.router.navigate(['/delivery-partners']);
            },
            (error) => {
                this.errorMessage = 'Failed to create delivery partner. Please try again.';
                this.loading = false;
            }
        );
    }
}
