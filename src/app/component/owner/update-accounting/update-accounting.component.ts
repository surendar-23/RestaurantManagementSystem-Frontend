import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OwnerService} from "../../services/owner.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-accounting',
    templateUrl: './update-accounting.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./update-accounting.component.css']
})
export class UpdateAccountingComponent implements OnInit {
    updateAccountingForm: FormGroup;
    isSubmitted: boolean = false;
    accountingId: number | undefined;
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private route: ActivatedRoute
    ) {
        this.updateAccountingForm = this.formBuilder.group({
            accountingId: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.01)]]
        });
    }

    ngOnInit(): void {
        // Fetch the accounting details if the ID is passed in the route
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.accountingId = +params['id'];
                this.getAccountingDetails(this.accountingId);
            }
        });
    }

    // Fetch accounting details by ID
    getAccountingDetails(id: number): void {
        this.loading = true;
        this.ownerService.getAccountingById(id).subscribe(
            response => {
                this.loading = false;
                this.updateAccountingForm.patchValue({
                    accountingId: response.id,
                    amount: response.amount,
                });
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load accounting details. Please try again later.';
                console.error('Error fetching accounting details:', error);
            }
        );
    }

    // Submit updated accounting details
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.updateAccountingForm.invalid) {
            return;
        }

        const accountingData = this.updateAccountingForm.value;
        this.ownerService.updateAccounting(accountingData, accountingData.accountingId).subscribe(
            response => {
                console.log('Accounting details updated successfully!', response);

                this.isSubmitted = false;
            },
            error => {
                console.error('Error updating accounting details:', error);
            }
        );
    }
}
