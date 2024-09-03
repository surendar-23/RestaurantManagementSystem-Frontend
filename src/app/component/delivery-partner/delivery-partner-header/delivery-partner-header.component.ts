import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import {DeliveryPartnerService} from "../../services/delivery-partner.service";

@Component({
    selector: 'app-delivery-partner-header',
    standalone: true,
    templateUrl: './delivery-partner-header.component.html',
    styleUrl: './delivery-partner-header.component.css'
})
export class DeliveryPartnerHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    constructor(
        private route: Router,
        private deliveryService: DeliveryPartnerService
    ) {
        if (this.deliveryService.getName() !== null) {
            this.name = this.deliveryService.getName();
        }
    }

    ngOnInit(): void {
        this.route.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: any) => {
            this.url = event?.url;
        });
    }


    gotourl(link: string): void {
        if (link === '/delivery-partner/logout') {
            this.deliveryService.deliveryPartnerLogout();
            return;
        }

        this.route.navigate([link]).then(success => {
            if (success) {
                console.log('Navigation successful!');
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
