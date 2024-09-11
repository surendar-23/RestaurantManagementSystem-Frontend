import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerService} from "../../services/customer.service";
import {Feedback} from "../../model/feedback";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-feedback',
    templateUrl: './create-feedback.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {
    feedbackForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private router: Router
    ) {
        this.feedbackForm = this.formBuilder.group({
            orderId: ['', [Validators.required, Validators.min(1)]],
            comment: ['', Validators.required],
            rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.feedbackForm.valid) {
            const feedbackData: Feedback = {
                order: {id: this.feedbackForm.value.orderId},
                comment: this.feedbackForm.value.comment,
                rating: this.feedbackForm.value.rating
            };

            this.customerService.createFeedback(feedbackData).subscribe(
                response => {
                    console.log('Feedback submitted successfully:', response);
                    this.router.navigate(['/customer/view-feedbacks']).then(success => {
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
                    console.error('Error submitting feedback:', error);
                }
            );
        }
    }
}
