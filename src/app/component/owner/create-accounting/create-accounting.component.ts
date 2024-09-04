import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-accounting',
    templateUrl: './create-accounting.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./create-accounting.component.css']
})
export class CreateAccountingComponent implements OnInit {
    accountingForm!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.accountingForm = this.formBuilder.group({
            date: ['', Validators.required],
            amount: [0, [Validators.required, Validators.min(0.01)]],
            ownerId: [0, Validators.required],
            billId: [0, Validators.required]
        });
    }

    get f() {
        return this.accountingForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.accountingForm.invalid) {
            return;
        }

        const accountingData = {
            date: this.accountingForm.value.date,
            amount: this.accountingForm.value.amount,
            owner: {id: this.accountingForm.value.ownerId},
            bills: [{id: this.accountingForm.value.billId}]
        };

        this.ownerService.createAccounting(accountingData).subscribe(
            response => {
                console.log('Accounting entry created successfully:', response);
                this.router.navigate(['/owner/view-accounting']).then(success => {
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
                console.error('Error creating accounting entry:', error);
            }
        );
    }
}
