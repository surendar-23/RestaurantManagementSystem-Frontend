import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs';
import {OwnerService} from "../../services/owner.service";
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-owner-header',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './owner-header.component.html',
    styleUrl: './owner-header.component.css'
})
export class OwnerHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/owner/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/owner/create-accounting', label: 'Create Accounting', icon: 'fas fa-file-invoice-dollar'},
        {path: '/owner/view-accounting', label: 'View Accounting', icon: 'fas fa-file-invoice-dollar'},
        {path: '/owner/create-bill', label: 'Create Bill', icon: 'fas fa-file-invoice'},
        {path: '/owner/view-bill', label: 'View Bill', icon: 'fas fa-file-invoice'},
        {path: '/owner/create-inventory-item', label: 'Create Inventory', icon: 'fas fa-boxes'},
        {path: '/owner/view-inventory-items', label: 'View Inventory', icon: 'fas fa-boxes'},

    ];

    navItems2 = [
        {path: '/owner/view-suppliers', label: 'View Suppliers', icon: 'fas fa-people-carry'},
        {path: '/owner/create-table', label: 'Create Table', icon: 'fas fa-chair'},
        {path: '/owner/view-table', label: 'View Tables', icon: 'fas fa-chair'},
        {path: '/owner/view-payments', label: 'View Payments', icon: 'fas fa-credit-card'},
        {path: '/owner/view-orders', label: 'View Orders', icon: 'fas fa-shopping-cart'},
        {path: '/owner/view-order-details', label: 'View Order Details', icon: 'fas fa-info-circle'},
        {path: '/owner/view-feedbacks', label: 'View Feedbacks', icon: 'fas fa-comments'},
        {path: '/owner/logout', label: 'Logout', icon: 'fas fa-sign-out-alt'}

    ]


    constructor(
        private route: Router,
        private ownerService: OwnerService
    ) {
        this.name = this.ownerService.getName() || '';
    }

    ngOnInit(): void {
        this.route.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            this.url = event.url;
        });
    }

    gotourl(link: string): void {
        if (link === '/owner/logout') {
            this.ownerService.ownerLogout();
            return;
        }

        this.route.navigate([link]).then(success => {
            console.log(success ? 'Navigation successful!' : 'Navigation failed!');
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}