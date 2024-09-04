import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-update-supplier',
    templateUrl: './update-supplier.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {
    supplierForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.supplierForm = this.fb.group({
            supplierId: [null, Validators.required],
            name: [null, Validators.required],
            contactInformation: [null, [Validators.required, Validators.email]]
        });

        // Listen for changes to the supplierId field
        this.supplierForm.get('supplierId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadSupplierDetails(id);
            }
        });
    }

    loadSupplierDetails(id: number) {
        this.ownerService.getSupplierById(id).subscribe(
            (supplier) => {
                this.supplierForm.patchValue({
                    name: supplier.name,
                    contactInformation: supplier.contactInformation
                });
            },
            (error) => {
                console.error('Error loading supplier:', error);
                this.supplierForm.reset({
                    supplierId: id,
                    name: null,
                    contactInformation: null
                });
                alert('Supplier not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.supplierForm.valid) {
            const updateData = this.supplierForm.value;
            const supplierId = updateData.supplierId;
            this.ownerService.updateSupplier(updateData, supplierId).subscribe(
                () => {
                    alert('Supplier updated successfully!');
                    this.router.navigate(['/owner-dashboard']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.log('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                },
                (error) => {
                    console.error('Error updating supplier:', error);
                    alert('Error updating supplier.');
                }
            );
        }
    }
}
