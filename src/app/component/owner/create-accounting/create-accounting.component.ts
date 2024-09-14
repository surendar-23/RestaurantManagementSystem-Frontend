import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {Router} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-create-accounting',
    templateUrl: './create-accounting.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        DatePipe,
        NgForOf
    ],
    styleUrls: ['./create-accounting.component.css']
})
export class CreateAccountingComponent implements OnInit {
    accountingForm!: FormGroup;
    submitted = false;
    owners: any[] = [];  // To store the owners fetched from backend

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        // Initialize the form
        this.accountingForm = this.formBuilder.group({
            date: ['', Validators.required],
            amount: [0, [Validators.required, Validators.min(0.01)]],
            ownerId: ['', [Validators.required, Validators.min(1)]]
        });

        // Fetch owners and bills
        this.getOwners();
    }

    // Fetch owners from backend
    getOwners(): void {
        this.ownerService.getOwners().subscribe(
            (data: any) => {
                this.owners = data;
            },
            (error: any) => {
                console.error('Error fetching owners:', error);
            }
        );
    }

    // Easy access to form controls
    get f() {
        return this.accountingForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // Stop if form is invalid
        if (this.accountingForm.invalid) {
            return;
        }

        // Prepare accounting data based on the form inputs
        const accountingData = {
            date: this.accountingForm.value.date,
            amount: this.accountingForm.value.amount,
            owner: {id: this.accountingForm.value.ownerId},  // Owner relationship
        };

        // Send data to the service for saving the accounting entry
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
