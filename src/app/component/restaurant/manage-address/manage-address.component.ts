import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Address} from "../../model/address";

@Component({
    selector: 'app-manage-address',
    templateUrl: './manage-address.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
    addresses: Address[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllAddresses();
    }

    // Fetch all addresses
    getAllAddresses(): void {
        this.loading = true;
        this.ownerService.getAllAddress().subscribe(
            response => {
                this.loading = false;
                this.addresses = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load addresses. Please try again later.';
                console.error('Error fetching addresses:', error);
            }
        );
    }

    // Delete address by ID
    deleteAddress(id: number | undefined): void {
        if (confirm('Are you sure you want to delete this address?')) {
            this.ownerService.deleteAddress(id).subscribe(
                response => {
                    console.log('Address deleted successfully!', response);
                    this.getAllAddresses(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting address:', error);
                    this.errorMessage = 'Failed to delete address. Please try again later.';
                }
            );
        }
    }
}
