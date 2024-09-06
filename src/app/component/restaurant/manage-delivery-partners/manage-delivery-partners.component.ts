import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-manage-delivery-partners',
    templateUrl: './manage-delivery-partners.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./manage-delivery-partners.component.css']
})
export class ManageDeliveryPartnersComponent implements OnInit {
    deliveryPartners: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllDeliveryPartners();
    }

    // Fetch all delivery partners
    getAllDeliveryPartners(): void {
        this.loading = true;
        this.ownerService.getDeliveryPartners().subscribe(
            response => {
                this.loading = false;
                this.deliveryPartners = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load delivery partners. Please try again later.';
                console.error('Error fetching delivery partners:', error);
            }
        );
    }

    // Delete delivery partner by ID
    deleteDeliveryPartner(id: number): void {
        if (confirm('Are you sure you want to delete this delivery partner?')) {
            this.ownerService.deleteDeliveryPartner(id).subscribe(
                response => {
                    console.log('Delivery partner deleted successfully!', response);
                    this.getAllDeliveryPartners(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting delivery partner:', error);
                    this.errorMessage = 'Failed to delete delivery partner. Please try again later.';
                }
            );
        }
    }
}
