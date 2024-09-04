import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-view-table',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgForOf
    ],
    templateUrl: './view-table.component.html',
    styleUrls: ['./view-table.component.css']
})
export class ManageTableComponent implements OnInit {
    tables: any[] = [];
    loading: boolean = false;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllTables();
    }

    // Fetch all tables
    getAllTables(): void {
        this.loading = true;
        this.ownerService.getTables().subscribe(
            response => {
                this.loading = false;
                this.tables = response;
            },
            error => {
                this.loading = false;
                this.errorMessage = 'Failed to load tables. Please try again later.';
                console.error('Error fetching tables:', error);
            }
        );
    }

    // Delete table by ID
    deleteTable(id: number): void {
        if (confirm('Are you sure you want to delete this table?')) {
            this.ownerService.deleteTable(id).subscribe(
                () => {
                    console.log('Table deleted successfully!');
                    this.getAllTables(); // Refresh the list after deletion
                },
                error => {
                    console.error('Error deleting table:', error);
                    this.errorMessage = 'Failed to delete table. Please try again later.';
                }
            );
        }
    }
}
