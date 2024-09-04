import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {ChefService} from "../../services/chef.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-chef-header',
    standalone: true,
    templateUrl: './chef-header.component.html',
    styleUrls: ['./chef-header.component.css'],
    imports: [RouterLink, NgForOf]
})
export class ChefHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/chef/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/chef/update-menu-items', label: 'Update Menu', icon: 'fas fa-edit'},
        {path: '/chef/view-menu-items', label: 'View Menu', icon: 'fas fa-th-list'},
        {path: '/chef/update-inventory-status', label: 'Update Inventory', icon: 'fas fa-box'},
        {path: '/chef/view-inventory-items', label: 'View Inventory', icon: 'fas fa-box-open'},
        {path: '/chef/update-order-status', label: 'Update Order', icon: 'fas fa-clipboard-check'},
        {path: '/chef/view-orders', label: 'View Orders', icon: 'fas fa-list'},
        {path: '/chef/view-order-details', label: 'View Order Details', icon: 'fas fa-info-circle'},
        {path: '/chef/view-feedbacks', label: 'View Feedbacks', icon: 'fas fa-comments'},
        {path: '/chef/logout', label: 'Logout', icon: 'fas fa-sign-out-alt'}
    ];

    constructor(
        private route: Router,
        private cService: ChefService,
    ) {
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
        if (path === '/chef/logout') {
            this.cService.chefLogout();
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
