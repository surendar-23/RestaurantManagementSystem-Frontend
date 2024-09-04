import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-update-bill',
    templateUrl: './update-bill.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./update-bill.component.css']
})
export class UpdateBillComponent implements OnInit {
    billForm!: FormGroup;

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
        this.billForm = this.fb.group({
            billId: [null, Validators.required],
            date: [null, Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            description: [null]
        });

        // Listen for changes to the billId field
        this.billForm.get('billId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadBillDetails(id);
            }
        });
    }

    loadBillDetails(id: number) {
        this.ownerService.getBillById(id).subscribe(
            (bill) => {
                this.billForm.patchValue({
                    date: new Date(bill.date).toISOString().split('T')[0], // Assuming date is in ISO format
                    amount: bill.amount,
                    description: bill.description
                });
            },
            (error) => {
                console.error('Error loading bill:', error);
                this.billForm.reset({
                    billId: id,
                    date: null,
                    amount: null,
                    description: null
                });
                alert('Bill not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.billForm.valid) {
            const updateData = this.billForm.value;
            const billId = updateData.billId;
            this.ownerService.updateBill(updateData, billId).subscribe(
                () => {
                    alert('Bill updated successfully!');
                    this.router.navigate(['/owner-dashboard']).then(success => {
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
                    console.error('Error updating bill:', error);
                    alert('Error updating bill.');
                }
            );
        }
    }
}
