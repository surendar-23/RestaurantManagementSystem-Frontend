import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
        private route: ActivatedRoute,
        private router: Router
    ) {
        // Build the form with accountingId, amount, and date fields
        this.updateAccountingForm = this.formBuilder.group({
            accountingId: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.01)]],
            date: ['', Validators.required], // Adding date field
        });
    }

    ngOnInit(): void {
        // Fetch accounting details if an ID is passed in the route
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
                    date: response.date, // Populate date in form
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
                alert("Accounting details updated successfully!")
                this.router.navigate(['/owner/view-accounting']).then(success => {
                    if (success) {
                        console.log('Navigation successful!');
                    } else {
                        console.log('Navigation failed!');
                    }
                }).catch(err => {
                    console.error('Navigation error:', err);
                });
                this.isSubmitted = false;
            },
            error => {
                console.error('Error updating accounting details:', error);
            }
        );
    }
}
