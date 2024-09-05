import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OwnerService} from "../../services/owner.service";
import {Address} from "../../model/address";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-create-address',
    templateUrl: './create-address.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent {
    address: Address = new Address();
    successMessage: string | undefined;
    errorMessage: string | undefined;

    constructor(private addressService: OwnerService, private router: Router) {
    }

    createAddress(): void {
        this.addressService.createAddress(this.address).subscribe(
            response => {
                this.successMessage = 'Address created successfully!';
                setTimeout(() => {
                    this.router.navigate(['/restaurant/manage-address']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                }, 2000);
            },
            error => {
                this.errorMessage = 'Failed to create address. Please try again later.';
                console.error('Error creating address:', error);
            }
        );
    }
}