import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import {OwnerService} from "../../services/owner.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-restaurant-header',
    templateUrl: './restaurant-header.component.html',
    standalone: true,
    imports: [
        NgForOf
    ],
    styleUrls: ['./restaurant-header.component.css']
})
export class RestaurantHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/restaurant/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/restaurant/create-address', label: 'Create Address', icon: 'fas fa-map-marker-alt'},
        {path: '/restaurant/manage-address', label: 'Manage Address', icon: 'fas fa-address-book'},
        {path: '/restaurant/create-restaurant', label: 'Create Restaurant', icon: 'fas fa-plus-circle'},
        {path: '/restaurant/manage-restaurants', label: 'Manage Restaurants', icon: 'fas fa-tasks'},
        {path: '/restaurant/create-waiter', label: 'Create Waiter', icon: 'fas fa-user'},
        {path: '/restaurant/manage-waiters', label: 'Manage Waiters', icon: 'fas fa-tasks'},
        {path: '/restaurant/create-category', label: 'Create Category', icon: 'fas fa-tags'},
        {path: '/restaurant/manage-category', label: 'Manage Category', icon: 'fas fa-tasks'},
        {path: '/restaurant/update-category', label: 'Update Category', icon: 'fas fa-edit'}
    ];

    navItems2 = [
        {path: '/restaurant/create-menu-item', label: 'Create Menu Item', icon: 'fas fa-utensils'},
        {path: '/restaurant/manage-menu-item', label: 'Manage Menu Items', icon: 'fas fa-tasks'},
        {path: '/restaurant/update-menu-item', label: 'Update Menu Item', icon: 'fas fa-edit'},
        {path: '/restaurant/create-chef', label: 'Create Chef', icon: 'fas fa-user-chef'},
        {path: '/restaurant/manage-chefs', label: 'Manage Chefs', icon: 'fas fa-tasks'},
        {path: '/restaurant/update-chef', label: 'Update Chef', icon: 'fas fa-edit'},

        {path: '/restaurant/create-delivery-partner', label: 'Create Delivery Partner', icon: 'fas fa-motorcycle'},
        {path: '/restaurant/manage-delivery-partners', label: 'Manage Delivery Partners', icon: 'fas fa-tasks'},
        {path: '/restaurant/update-delivery-partners', label: 'Update Delivery Partner', icon: 'fas fa-edit'},
        {path: '/restaurant/logout', label: 'Logout', icon: 'fas fa-sign-out-alt'}
    ];


    constructor(
        private router: Router,
        private ownerService: OwnerService
    ) {
        this.name = this.ownerService.getName() || '';
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            this.url = event.url;
        });
    }

    gotourl(link: string): void {

        if (link === '/restaurant/logout') {
            this.ownerService.ownerLogout();
            return;
        }

        this.router.navigate([link]).then(success => {
            console.log(success ? 'Navigation successful!' : 'Navigation failed!');
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
