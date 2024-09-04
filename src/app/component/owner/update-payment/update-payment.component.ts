import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service'; // Adjust the path as necessary

@Component({
    selector: 'app-update-payment',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './update-payment.component.html',
    styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {
    paymentForm!: FormGroup;

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
        this.paymentForm = this.fb.group({
            id: [null, Validators.required],
            paymentDate: [null, Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            order: [null] // Assuming `order` is a complex object; adjust validation as needed
        });

        // Listen for changes to the `id` field
        this.paymentForm.get('id')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadPaymentDetails(id);
            }
        });
    }

    loadPaymentDetails(id: number) {
        this.ownerService.getPaymentById(id).subscribe(
            (payment) => {
                this.paymentForm.patchValue({
                    paymentDate: new Date(payment.paymentDate).toISOString().split('T')[0], // Assuming date is in ISO format
                    amount: payment.amount,
                    order: payment.order // Adjust based on how `order` is represented
                });
            },
            (error) => {
                console.error('Error loading payment:', error);
                this.paymentForm.reset({id});
                alert('Payment not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.paymentForm.valid) {
            const updateData = this.paymentForm.value;
            this.ownerService.updatePayment(updateData, updateData.id).subscribe(
                () => {
                    alert('Payment updated successfully!');
                    this.router.navigate(['/payment-dashboard']).then(success => {
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
                    console.error('Error updating payment:', error);
                    alert('Error updating payment.');
                }
            );
        }
    }
}
