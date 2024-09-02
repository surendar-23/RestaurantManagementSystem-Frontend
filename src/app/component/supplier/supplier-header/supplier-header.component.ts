import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import {SupplierService} from "../../services/supplier.service";

@Component({
    selector: 'app-supplier-header',
    templateUrl: './supplier-header.component.html',
    standalone: true,
    styleUrls: ['./supplier-header.component.css']
})
export class SupplierHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    constructor(
        private route: Router,
        private supService: SupplierService,
    ) {
        if (this.supService.getName() !== null) {
            this.name = this.supService.getName();
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
        if (link === '/supplier/logout') {
            this.supService.supplierLogout();
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