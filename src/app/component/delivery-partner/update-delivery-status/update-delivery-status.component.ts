import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeliveryPartnerService} from '../../services/delivery-partner.service';
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-delivery-status',
    templateUrl: './update-delivery-status.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./update-delivery-status.component.css']
})
export class UpdateDeliveryStatusComponent implements OnInit {
    deliveryForm!: FormGroup;
    deliveryNotFound: boolean = false;

    constructor(
        private fb: FormBuilder,
        private deliveryPartnerService: DeliveryPartnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.deliveryForm = this.fb.group({
            id: ['', Validators.required],
            deliveryTime: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            status: ['', Validators.required]
        });

        this.onIdChange();
    }

    onIdChange(): void {
        this.deliveryForm.get('id')?.valueChanges.subscribe(id => {
            if (id) {
                this.deliveryPartnerService.getDeliveryById(id).subscribe({
                    next: delivery => {
                        if (delivery) {
                            this.deliveryNotFound = false;
                            this.deliveryForm.patchValue({
                                deliveryTime: delivery.deliveryTime,
                                street: delivery.street,
                                city: delivery.city,
                                state: delivery.state,
                                postalCode: delivery.postalCode,
                                status: delivery.status
                            });
                        } else {
                            this.deliveryNotFound = true;
                            this.deliveryForm.reset();
                        }
                    },
                    error: err => {
                        console.error('Error fetching delivery:', err);
                        this.deliveryNotFound = true;
                        this.deliveryForm.reset();
                    }
                });
            }
        });
    }

    onSubmit(): void {
        if (this.deliveryForm.valid) {
            const formValue = this.deliveryForm.value;
            const deliveryId = formValue.id;

            this.deliveryPartnerService.updateDelivery({
                deliveryTime: formValue.deliveryTime,
                street: formValue.street,
                city: formValue.city,
                state: formValue.state,
                postalCode: formValue.postalCode,
                status: formValue.status
            }, deliveryId).subscribe({
                next: () => {
                    console.log('Delivery updated successfully!');
                    this.router.navigate(['/delivery-partner/home']).then(success => {
                        if (success) {
                            console.log('Navigation is successful!');
                            alert("Delivery Updated Successfully!");
                        } else {
                            console.log('Navigation has failed!');
                        }
                    })
                        .catch(err => {
                            console.error('Navigation error:', err);
                        });
                },
                error: err => {
                    console.error('Error updating delivery:', err);
                }
            });
        }
    }
}
