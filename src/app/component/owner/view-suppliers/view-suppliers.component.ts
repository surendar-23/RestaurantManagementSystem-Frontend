import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {OwnerService} from '../../services/owner.service';

@Component({
    selector: 'app-view-suppliers',
    standalone: true,
    imports: [NgIf, NgForOf, RouterLink],
    templateUrl: './view-suppliers.component.html',
    styleUrls: ['./view-suppliers.component.css']
})
export class ManageSuppliersComponent implements OnInit {
    suppliers: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllSuppliers();
    }

    // Fetch all Suppliers
    getAllSuppliers(): void {
        this.loading = true;
        this.ownerService.getSuppliers().subscribe(
            response => {
                this.loading = false;
                this.suppliers = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load suppliers. Please try again later.';
                console.error('Error fetching suppliers:', error);
            }
        );
    }

    // Delete Supplier by ID
    deleteSupplier(id: number): void {
        if (confirm('Are you sure you want to delete this supplier?')) {
            this.ownerService.deleteUser(id).subscribe(
                response => {
                    console.log('Supplier deleted successfully!', response);
                    this.getAllSuppliers(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting supplier:', error);
                    this.errorMessage = 'Failed to delete supplier. Please try again later.';
                }
            );
        }
    }
}
