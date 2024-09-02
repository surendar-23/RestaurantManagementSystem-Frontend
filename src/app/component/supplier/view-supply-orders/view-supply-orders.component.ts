import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {take} from 'rxjs/operators';
import {SupplierService} from "../../services/supplier.service";
import {OrderDetails} from "../../model/orderDetails";
import {MatFormField} from "@angular/material/form-field";

@Component({
    selector: 'app-view-supply-orders',
    standalone: true,
    imports: [
        MatFormField,
        NgForOf,
        NgIf
    ],
    templateUrl: './view-supply-orders.component.html',
    styleUrl: './view-supply-orders.component.css'
})
export class ViewSupplyOrdersComponent {

    orderDetails: OrderDetails[] = [];
    tempOrderDetails: OrderDetails[] = [];

    constructor(private supService: SupplierService) {
    }

    ngOnInit(): void {
        this.getOrderDetailsList();
    }

    getOrderDetailsList(): void {
        this.supService.getOrderDetails().pipe(take(1)).subscribe(
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