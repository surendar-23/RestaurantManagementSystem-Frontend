import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OwnerService} from "../../services/owner.service";
import {Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-create-table',
    templateUrl: './create-table.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
    tableForm!: FormGroup;
    submitted = false;
    restaurants: any[] = []; // Array to store restaurant options

    constructor(
        private formBuilder: FormBuilder,
        private ownerService: OwnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.tableForm = this.formBuilder.group({
            number: ['', [Validators.required, Validators.min(1)]],
            seats: ['', [Validators.required, Validators.min(1)]],
            restaurantId: ['', Validators.required]
        });

        // Fetch restaurants for the dropdown
        this.ownerService.getAllRestaurants().subscribe(
            response => {
                this.restaurants = response;
            },
            error => {
                console.error('Error fetching restaurants:', error);
            }
        );
    }

    get f() {
        return this.tableForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.tableForm.invalid) {
            return;
        }

        const tableData = {
            number: this.tableForm.value.number,
            seats: this.tableForm.value.seats,
            restaurant: {id: this.tableForm.value.restaurantId}
        };

        this.ownerService.createTable(tableData).subscribe(
            response => {
                console.log('Table created successfully:', response);
                this.router.navigate(['/owner/view-table']).then(success => {
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
                console.error('Error creating table:', error);
            }
        );
    }
}
