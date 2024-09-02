import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {take} from 'rxjs/operators';
import {SupplierService} from "../../services/supplier.service";
import {InventoryItem} from "../../model/inventoryItem";
import {MatFormField} from "@angular/material/form-field";

@Component({
    selector: 'app-view-inventory-items',
    standalone: true,
    imports: [
        MatFormField,
        NgIf,
        NgForOf
    ],
    templateUrl: './view-inventory-items.component.html',
    styleUrls: ['./view-inventory-items.component.css']
})
export class ViewInventoryItemsComponent {

    inventoryItems: InventoryItem[] = [];
    tempInventoryItems: InventoryItem[] = [];

    constructor(private supService: SupplierService) {
    }

    ngOnInit(): void {
        this.getInventoryItemList();
    }

    getInventoryItemList(): void {
        this.supService.getInventoryItems().pipe(take(1)).subscribe(
            (res: any) => {
                try {
                    if (res && Array.isArray(res)) {
                        this.inventoryItems = res;
                        this.tempInventoryItems = res;
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
