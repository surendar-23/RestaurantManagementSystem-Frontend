import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';
import {OwnerService} from "../../services/owner.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-restaurant-header',
    templateUrl: './restaurant-header.component.html',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./restaurant-header.component.css']
})
export class RestaurantHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/restaurant/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/restaurant/manage-restaurants', label: 'Manage Restaurants', icon: 'fas fa-tasks'},
        {path: '/restaurant/manage-waiters', label: 'Manage Waiters', icon: 'fas fa-tasks'},
        {path: '/restaurant/create-category', label: 'Create Category', icon: 'fas fa-tags'},
        {path: '/restaurant/manage-category', label: 'Manage Category', icon: 'fas fa-tasks'},

    ];

    navItems2 = [
        {path: '/restaurant/create-menu-item', label: 'Create Menu Item', icon: 'fas fa-utensils'},
        {path: '/restaurant/manage-menu-item', label: 'Manage Menu Items', icon: 'fas fa-tasks'},
        {path: '/restaurant/manage-chefs', label: 'Manage Chefs', icon: 'fas fa-tasks'},
        {path: '/restaurant/manage-delivery-partners', label: 'Manage Delivery Partners', icon: 'fas fa-tasks'},
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
