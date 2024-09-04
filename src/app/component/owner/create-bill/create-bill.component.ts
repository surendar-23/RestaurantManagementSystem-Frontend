import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-create-bill',
    templateUrl: './create-bill.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        DatePipe,
        CurrencyPipe,
        NgForOf
    ],
    styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
    createBillForm: FormGroup;
    accountingEntries: any[] = [];
    errorMessage: string | undefined;

    constructor(
        private fb: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
        this.createBillForm = this.fb.group({
            date: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.01)]],
            description: [''],
            accountingId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadAccountingEntries();
    }

    // Load accounting entries to populate the dropdown
    loadAccountingEntries(): void {
        this.ownerService.getAccounting().subscribe(
            response => {
                this.accountingEntries = response;
            },
            error => {
                console.error('Error loading accounting entries:', error);
                this.errorMessage = 'Failed to load accounting entries. Please try again later.';
            }
        );
    }

    // Handle form submission
    onSubmit(): void {
        if (this.createBillForm.invalid) {
            return;
        }

        const billData = {
            date: this.createBillForm.value.date,
            amount: this.createBillForm.value.amount,
            description: this.createBillForm.value.description,
            accounting: {id: this.createBillForm.value.accountingId}
        };

        this.ownerService.createBill(billData).subscribe(
            response => {
                console.log('Bill created successfully!', response);
                this.router.navigate(['/owner/view-bill']).then(success => {
                    if (success) {
                        console.log('Navigation is successful!');
                    } else {
                        console.log('Navigation has failed!');
                    }
                }); // Redirect to the bills list
            },
            error => {
                console.error('Error creating bill:', error);
                this.errorMessage = 'Failed to create bill. Please try again later.';
            }
        );
    }
}
