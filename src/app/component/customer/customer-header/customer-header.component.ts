import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import {CustomerService} from "../../services/customer.service";
import {filter} from "rxjs";


@Component({
    selector: 'app-customer-header',
    standalone: true,
    templateUrl: './customer-header.component.html',
    imports: [
        RouterLink,
        NgForOf,
        RouterLinkActive
    ],
    styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

    url: string = '';
    name: string = '';

    navItems = [
        {path: '/customer/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/customer/view-menu-items', label: 'View Menu', icon: 'fas fa-utensils'},
        {path: '/customer/create-order', label: 'Create Order', icon: 'fas fa-cart-plus'},
        {path: '/customer/view-orders', label: 'View Orders', icon: 'fas fa-list'},
        {path: '/customer/create-feedback', label: 'Create Feedback', icon: 'fas fa-comment-dots'},
        {path: '/customer/view-feedbacks', label: 'View Feedbacks', icon: 'fas fa-comments'},
        {path: '/customer/create-payment', label: 'Create Payment', icon: 'fas fa-credit-card'},
        {path: '/customer/view-payments', label: 'View Payments', icon: 'fas fa-receipt'},
        {path: '/customer/logout', label: 'Logout', icon: 'fas fa-sign-out-alt'}
    ];

    constructor(
        private route: Router,
        private cService: CustomerService) {
        if (this.cService.getName() !== null) {
            this.name = this.cService.getName();
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
        if (path === '/customer/logout') {
            this.cService.customerLogout();
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


