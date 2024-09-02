import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {take} from 'rxjs/operators';
import {Table} from '../../model/table';
import {WaiterService} from '../../services/waiter.service';

@Component({
    selector: 'app-view-table-details',
    standalone: true,
    imports: [
        NgIf,
        NgForOf
    ],
    templateUrl: './view-table-details.component.html',
    styleUrls: ['./view-table-details.component.css']
})
export class ViewTableDetailsComponent implements OnInit {

    tableDetails: Table[] = [];

    constructor(private waiterService: WaiterService) {
    }

    ngOnInit(): void {
        this.getTableDetails();
    }

    getTableDetails(): void {
        this.waiterService.getTables().pipe(take(1)).subscribe(
            (res: any) => {
                try {
                    if (res && Array.isArray(res)) {
                        this.tableDetails = res;
                    } else {
                        console.error("Unexpected response format:", res);
                    }
                } catch (e) {
                    console.error("Error parsing response:", e);
                }
            },
            (err) => {
                console.error("Error fetching table details:", err);
            }
        );
    }
}
