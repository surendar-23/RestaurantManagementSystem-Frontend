import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {WaiterService} from "../../services/waiter.service";

@Component({
    selector: 'app-waiter-header',
    standalone: true,
    templateUrl: './waiter-header.component.html',
    styleUrl: './waiter-header.component.css'
})
export class WaiterHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

    constructor(
        private route: Router,
        private wService: WaiterService,
    ) {
        if (this.wService.getName() !== null) {
            this.name = this.wService.getName();
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
        if (link === '/waiter/logout') {
            this.wService.waiterLogout();
            return;
        }

        this.route.navigate([link]).then(success => {
            if (success) {
                console.log('Navigation successful!');
            } else {
                console.log('Nagivation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}