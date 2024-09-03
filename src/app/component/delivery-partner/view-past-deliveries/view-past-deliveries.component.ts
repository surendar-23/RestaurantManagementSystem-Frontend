import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {take} from 'rxjs/operators';
import {Delivery} from '../../model/delivery';
import {DeliveryPartnerService} from '../../services/delivery-partner.service';

@Component({
    selector: 'app-view-past-deliveries',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        DatePipe
    ],
    templateUrl: './view-past-deliveries.component.html',
    styleUrls: ['./view-past-deliveries.component.css']
})
export class ViewPastDeliveriesComponent implements OnInit {

    pastDeliveries: Delivery[] = [];

    constructor(private deliveryPartnerService: DeliveryPartnerService) {
    }

    ngOnInit(): void {
        this.getPastDeliveries();
    }

    getPastDeliveries(): void {
        this.deliveryPartnerService.getAllDeliveries().pipe(take(1)).subscribe(
            (res: any) => {
                try {
                    if (res && Array.isArray(res)) {
                        this.pastDeliveries = res;
                    } else {
                        console.error("Unexpected response format:", res);
                    }
                } catch (e) {
                    console.error("Error parsing response:", e);
                }
            },
            (err) => {
                console.error("Error fetching past deliveries:", err);
            }
        );
    }
}
