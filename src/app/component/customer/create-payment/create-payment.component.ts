import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerService} from "../../services/customer.service";
import {Payment} from "../../model/payment";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-payment',
    templateUrl: './create-payment.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {
    paymentForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private router: Router
    ) {
        this.paymentForm = this.formBuilder.group({
            paymentDate: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.01)]],
            orderId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.paymentForm.valid) {
            const paymentData: Payment = {
                paymentDate: this.paymentForm.value.paymentDate,
                amount: this.paymentForm.value.amount,
                order: {id: this.paymentForm.value.orderId}
            };

            this.customerService.createPayment(paymentData).subscribe(
                response => {
                    console.log('Payment created successfully:', response);
                    this.router.navigate(['/customer/view-payments']).then(success => {
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
                    console.error('Error creating payment:', error);
                }
            );
        }
    }
}
