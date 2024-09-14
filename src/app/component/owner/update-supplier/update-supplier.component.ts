import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-supplier',
    templateUrl: './update-supplier.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
    styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {
    idForm: FormGroup;
    supplierForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    supplierId: number | null = null;

    constructor(
        private userService: OwnerService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.idForm = this.fb.group({
            supplierId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });

        this.supplierForm = this.fb.group({
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

        this.supplierId = +this.idForm.value.supplierId;
        this.loadSupplier();
    }

    loadSupplier(): void {
        if (this.supplierId === null) {
            this.errorMessage = 'Invalid supplier ID.';
            return;
        }

        this.loading = true;
        this.userService.getUserById(this.supplierId).subscribe({
            next: (data) => {
                this.supplierForm.patchValue({
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
                this.errorMessage = 'Error loading supplier details.';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.supplierForm.invalid) {
            return;
        }

        if (this.supplierId === null) {
            this.errorMessage = 'Supplier ID is not set.';
            return;
        }

        this.loading = true;
        const formValue = this.supplierForm.value;
        const updatedSupplier = {
            ...formValue,
            userId: this.supplierId,
            firstName: formValue.name.split(' ')[0],
            lastName: formValue.name.split(' ')[1]
        };

        this.userService.updateUser(this.supplierId, updatedSupplier).subscribe({
            next: () => {
                this.loading = false;
                alert('Updated Supplier details successfully'); // Show alert
                setTimeout(() => this.router.navigate(['/owner/view-suppliers']), 2000);
            },
            error: (err) => {
                this.errorMessage = 'Error updating supplier details.';
                this.loading = false;
            }
        });
    }
}
