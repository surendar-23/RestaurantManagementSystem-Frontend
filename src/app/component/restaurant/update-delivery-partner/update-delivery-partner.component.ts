import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from "../../services/owner.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-delivery-partner',
    templateUrl: './update-delivery-partner.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
    styleUrls: ['./update-delivery-partner.component.css']
})
export class UpdateDeliveryPartnerComponent {
    idForm: FormGroup;
    partnerForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    partnerId: number | null = null;

    constructor(
        private userService: OwnerService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.idForm = this.fb.group({
            partnerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });

        this.partnerForm = this.fb.group({
            name: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            address: ['', [Validators.required]],
            district: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            emailId: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit(): void {
    }

    onIdSubmit(): void {
        if (this.idForm.invalid) {
            return;
        }

        this.partnerId = +this.idForm.value.partnerId;
        this.loadPartner();
    }

    loadPartner(): void {
        if (this.partnerId === null) {
            this.errorMessage = 'Invalid delivery-partner ID.';
            return;
        }

        this.loading = true;
        this.userService.getUserById(this.partnerId).subscribe({
            next: (data) => {
                this.partnerForm.patchValue({
                    name: `${data.firstName} ${data.lastName}`,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    district: data.district,
                    state: data.state,
                    zipCode: data.zipCode,
                    emailId: data.emailId,
                    password: data.password
                });
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error loading delivery-partner details.';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.partnerForm.invalid) {
            return;
        }

        if (this.partnerId === null) {
            this.errorMessage = 'Delivery partner ID is not set.';
            return;
        }

        this.loading = true;
        const formValue = this.partnerForm.value;
        const updatedPartner = {
            ...formValue,
            userId: this.partnerId,
            firstName: formValue.name.split(' ')[0],
            lastName: formValue.name.split(' ')[1]
        };
        
        this.userService.updateUser(this.partnerId, updatedPartner).subscribe({
            next: () => {
                this.loading = false;
                alert('Updated delivery-partner successfully'); // Show alert
                setTimeout(() => this.router.navigate(['/restaurant/manage-delivery-partners']), 2000);
            },
            error: (err) => {
                this.errorMessage = 'Error updating delivery-partner details.';
                this.loading = false;
            }
        });
    }
}
