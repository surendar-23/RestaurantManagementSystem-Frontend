import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import {DeliveryPartnerService} from '../../services/delivery-partner.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-delivery-partner-header',
    standalone: true,
    templateUrl: './delivery-partner-header.component.html',
    styleUrls: ['./delivery-partner-header.component.css'],
    imports: [RouterLink, NgForOf]
})
export class DeliveryPartnerHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/delivery-partner/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/delivery-partner/create-delivery-task', label: 'Create Delivery', icon: 'fa fa-th-list'},
        {path: '/delivery-partner/update-delivery-status', label: 'Update Delivery Status', icon: 'fa fa-edit'},
        {path: '/delivery-partner/view-past-deliveries', label: 'View Deliveries', icon: 'fa fa-truck'},
        {path: '/delivery-partner/update-order-status', label: 'Update Order', icon: 'fa fa-file-text'},
        {path: '/delivery-partner/logout', label: 'Logout', icon: 'fa fa-sign-out-alt'}
    ];

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

    gotourl(path: string): void {
        if (path === '/delivery-partner/logout') {
            this.deliveryService.deliveryPartnerLogout();
            return;
        }

        this.route.navigate([path]).then(success => {
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
