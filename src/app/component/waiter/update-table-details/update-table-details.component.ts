import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WaiterService} from '../../services/waiter.service';

@Component({
    selector: 'app-update-table-details',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './update-table-details.component.html',
    styleUrls: ['./update-table-details.component.css']
})
export class UpdateTableDetailsComponent implements OnInit {
    tableForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private waiterService: WaiterService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.tableForm = this.fb.group({
            tableId: [null, Validators.required, Validators.min(1)],
            number: [null, [Validators.required, Validators.min(1)]],
            seats: [null, [Validators.required, Validators.min(1)]]
        });

        // Listen for changes to the tableId field
        this.tableForm.get('tableId')?.valueChanges.subscribe(id => {
            if (id) {
                this.loadTableDetails(id);
            }
        });
    }

    loadTableDetails(id: number) {
        this.waiterService.getTableById(id).subscribe(
            (table) => {
                this.tableForm.patchValue({
                    number: table.number,
                    seats: table.seats
                });
            },
            (error) => {
                console.error('Error loading table:', error);
                this.tableForm.reset({
                    tableId: id,
                    number: null,
                    seats: null
                });
                alert('Table not found or error occurred.');
            }
        );
    }

    onSubmit() {
        if (this.tableForm.valid) {
            const updateData = this.tableForm.value;
            const tableId = updateData.tableId;
            this.waiterService.updateTable(updateData, tableId).subscribe(
                () => {
                    alert('Table updated successfully!');
                    this.router.navigate(['/waiter']).then(success => {
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
                    console.error('Error updating table:', error);
                    alert('Error updating table.');
                }
            );
        }
    }
}
