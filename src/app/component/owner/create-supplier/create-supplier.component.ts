import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-supplier',
    templateUrl: './create-supplier.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {
    supplierForm!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.supplierForm = this.formBuilder.group({
            name: ['', Validators.required],
            contactInformation: ['', [Validators.required, Validators.email]]
        });
    }

    get f() {
        return this.supplierForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.supplierForm.invalid) {
            return;
        }

        const supplierData = {
            name: this.supplierForm.value.name,
            contactInformation: this.supplierForm.value.contactInformation
        };

        this.ownerService.createSupplier(supplierData).subscribe(
            response => {
                console.log('Supplier created successfully:', response);
                this.router.navigate(['/owner/view-suppliers']).then(success => {
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
                console.error('Error creating supplier:', error);
            }
        );
    }
}
