import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {take} from 'rxjs/operators';
import {Order} from '../../model/order';
import {WaiterService} from '../../services/waiter.service';

@Component({
    selector: 'app-view-current-orders',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        DatePipe,
        CurrencyPipe
    ],
    templateUrl: './view-current-orders.component.html',
    styleUrls: ['./view-current-orders.component.css']
})
export class ViewCurrentOrdersComponent implements OnInit {

    currentOrders: Order[] = [];

    constructor(private waiterService: WaiterService) {
    }

    ngOnInit(): void {
        this.getCurrentOrders();
    }

    getCurrentOrders(): void {
        this.waiterService.getAllOrders().pipe(take(1)).subscribe(
            (res: any) => {
                try {
                    if (res && Array.isArray(res)) {
                        this.currentOrders = res;
                    } else {
                        console.error("Unexpected response format:", res);
                    }
                } catch (e) {
                    console.error("Error parsing response:", e);
                }
            },
            (err) => {
                console.error("Error fetching current orders:", err);
            }
        );
    }
}
