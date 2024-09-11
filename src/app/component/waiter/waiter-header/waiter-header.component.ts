import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs';
import {WaiterService} from '../../services/waiter.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-waiter-header',
    standalone: true,
    templateUrl: './waiter-header.component.html',
    styleUrls: ['./waiter-header.component.css'],
    imports: [RouterLink, NgForOf, RouterLinkActive]
})
export class WaiterHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/waiter/home', label: 'Home', icon: 'fas fa-home'},
        {path: '/waiter/create-order', label: 'Create Order', icon: 'fas fa-edit'},
        {path: '/waiter/view-current-orders', label: 'View Orders', icon: 'fas fa-truck'},
        {path: '/waiter/update-order-status', label: 'Update Order', icon: 'fas fa-th-list'},
        {path: '/waiter/view-order-details', label: 'View Order Details', icon: 'fas fa-truck'},
        {path: '/waiter/update-table-details', label: 'Update Table', icon: 'fas fa-file-alt'},
        {path: '/waiter/view-table-details', label: 'View Table Details', icon: 'fas fa-truck'},
        {path: '/waiter/logout', label: 'Logout', icon: 'fas fa-sign-out-alt'}
    ];

    constructor(
        private route: Router,
        private wService: WaiterService
    ) {
        this.name = this.wService.getName() || '';
    }

    ngOnInit(): void {
        this.route.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            this.url = event.url;
        });
    }

    gotourl(link: string): void {
        if (link === '/waiter/logout') {
            this.wService.waiterLogout();
            return;
        }

        this.route.navigate([link]).then(success => {
            console.log(success ? 'Navigation successful!' : 'Navigation failed!');
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
