import {Component, OnInit} from '@angular/core';
import {DeliveryPartnerService} from "../../services/delivery-partner.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-delivery-partner-home',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './delivery-partner-home.component.html',
    styleUrl: './delivery-partner-home.component.css'
})
export class DeliveryPartnerHomeComponent implements OnInit {
    name: string = '';

    constructor(
        private deliveryService: DeliveryPartnerService
    ) {
        if (this.deliveryService.getName() !== null) {
            this.name = this.deliveryService.getName();
        }
        // this.deliveryService.isDeliveryPartnerPresent();
    }

    ngOnInit(): void {
    }
}
