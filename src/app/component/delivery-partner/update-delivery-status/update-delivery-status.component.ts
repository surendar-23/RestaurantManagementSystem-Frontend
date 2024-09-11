import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DeliveryPartnerService} from "../../services/delivery-partner.service";

@Component({
    selector: 'app-update-delivery-status',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './update-delivery-status.component.html',
    styleUrls: ['./update-delivery-status.component.css']
})
export class UpdateDeliveryStatusComponent implements OnInit {
    deliveryForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private deliveryPartnerService: DeliveryPartnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.deliveryForm = this.fb.group({
            id: [null, [Validators.required, Validators.min(1)]],
            deliveryTime: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            status: ['', Validators.required],
        });

        // Listen for changes to the id field
        this.deliveryForm.get('id')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadDeliveryDetails(id);
            }
        });
    }

    loadDeliveryDetails(id: number) {
        this.deliveryPartnerService.getDeliveryById(id).subscribe(
            (delivery) => {
                this.deliveryForm.patchValue({
                    deliveryTime: delivery.deliveryTime,
                    street: delivery.street,
                    city: delivery.city,
                    state: delivery.state,
                    postalCode: delivery.postalCode,
                    status: delivery.status
                });
            },
            (error) => {
                console.error('Error loading delivery:', error);
                this.deliveryForm.reset({
                    id: id,
                    deliveryTime: '',
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    status: ''
                });
                alert('Delivery not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.deliveryForm.valid) {
            const updateData = this.deliveryForm.value;
            const deliveryId = updateData.id;
            this.deliveryPartnerService.updateDelivery(updateData, deliveryId).subscribe(
                () => {
                    alert('Delivery updated successfully!');
                    this.router.navigate(['/delivery-partner/view-past-deliveries']).then(success => {
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
                    console.error('Error updating delivery:', error);
                    alert('Error updating delivery.');
                }
            );
        }
    }
}
