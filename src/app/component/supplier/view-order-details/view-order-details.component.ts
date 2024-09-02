import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {take} from 'rxjs/operators';
import {SupplierService} from "../../services/supplier.service";
import {Order} from "../../model/order";
import {MatFormField} from "@angular/material/form-field";

@Component({
    selector: 'app-view-order-details',
    standalone: true,
    imports: [
        MatFormField,
        NgIf,
        NgForOf
    ],
    templateUrl: './view-order-details.component.html',
    styleUrl: './view-order-details.component.css'
})
export class ViewOrderDetailsComponent {

    orderDetails: Order[] = [];
    tempOrderDetails: Order[] = [];

    constructor(private supService: SupplierService) {
    }

    ngOnInit(): void {
        this.getOrdersList();
    }

    getOrdersList(): void {
        this.supService.getOrders().pipe(take(1)).subscribe(
            (res: any) => {
                try {
                    if (res && Array.isArray(res)) {
                        this.orderDetails = res;
                        this.tempOrderDetails = res;
                    } else {
                        console.error("Unexpected response format:", res);
                    }
                } catch (e) {
                    console.error("Error parsing response:", e);
                }
            },
            (err) => {
                console.error("Error fetching inventory items:", err);
            }
        );
    }
}
