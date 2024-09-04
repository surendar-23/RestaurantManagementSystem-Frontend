import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-app-header',
    standalone: true,
    templateUrl: './app-header.component.html',
    imports: [
        RouterLink,
        NgForOf
    ],
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

    url: string = '/';

    navItems = [
        {path: '/', label: 'Home', icon: 'fas fa-home'},
        {path: '/about-us', label: 'About Us', icon: 'fas fa-address-card'},
        {path: '/contact-us', label: 'Contact Us', icon: 'fas fa-id-badge'},
        {path: '/chef', label: 'Chef', icon: 'fas fa-pizza-slice'},
        {path: '/customer', label: 'Customer', icon: 'fas fa-user-circle'},
        {path: '/delivery-partner', label: 'Delivery Partner', icon: 'fas fa-truck'},
        {path: '/owner', label: 'Owner', icon: 'fas fa-user'},
        {path: '/restaurant', label: 'Restaurant', icon: 'fas fa-store'},
        {path: '/supplier', label: 'Supplier', icon: 'fas fa-user-tie'},
        {path: '/waiter', label: 'Waiter', icon: 'fas fa-users'}
    ];

    constructor(private route: Router) {
        this.url = this.route.url;  // Initialize the url based on the current route
    }

    gotourl(url: string): void {
        this.route.navigate(["/" + url]).then(success => {
            if (success) {
                console.log('Navigation successful!');
                this.url = "/" + url;  // Update the selected URL after navigation
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
