import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {DeliveryPartnerService} from '../../services/delivery-partner.service';

@Component({
    selector: 'app-create-delivery-task',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-delivery-task.component.html',
    styleUrls: ['./create-delivery-task.component.css']
})
export class CreateDeliveryTaskComponent implements OnInit {
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
            deliveryTime: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            status: ['', Validators.required],
            orderId: [null, Validators.required],
            deliveryPartnerId: [null, Validators.required]
        });
    }

    onSubmit() {
        if (this.deliveryForm.valid) {
            this.deliveryPartnerService.createDelivery(this.deliveryForm.value).subscribe(
                () => {
                    alert('Delivery task created successfully!');
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
                    console.error('Error creating delivery task:', error);
                    alert('Error creating delivery task.');
                }
            );
        }
    }
}
