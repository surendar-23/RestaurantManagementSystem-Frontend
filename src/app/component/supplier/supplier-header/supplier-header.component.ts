import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import {SupplierService} from '../../services/supplier.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-supplier-header',
    standalone: true,
    templateUrl: './supplier-header.component.html',
    styleUrls: ['./supplier-header.component.css'],
    imports: [RouterLink, NgForOf]
})
export class SupplierHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    navItems = [
        {path: '/supplier/home', label: 'Home', icon: 'fa fa-home'},
        {path: '/supplier/view-inventory-items', label: 'View Inventory Items', icon: 'fa fa-th-list'},
        {path: '/supplier/update-inventory-item', label: 'Update Inventory Item', icon: 'fa fa-edit'},
        {path: '/supplier/view-order-details', label: 'View Order Details', icon: 'fa fa-file-text'},
        {path: '/supplier/view-supply-details', label: 'View Supply Details', icon: 'fa fa-truck'},
        {path: '/supplier/logout', label: 'Logout', icon: 'fa fa-sign-out-alt'}
    ];

    constructor(
        private route: Router,
        private supService: SupplierService
    ) {
        this.name = this.supService.getName() || '';
    }

    ngOnInit(): void {
        this.route.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            this.url = event.url;
        });
    }

    gotourl(link: string): void {
        if (link === '/supplier/logout') {
            this.supService.supplierLogout();
            return;
        }

        this.route.navigate([link]).then(success => {
            console.log(success ? 'Navigation successful!' : 'Navigation failed!');
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
