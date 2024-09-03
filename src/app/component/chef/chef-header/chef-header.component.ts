import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {ChefService} from "../../services/chef.service";

@Component({
    selector: 'app-chef-header',
    standalone: true,
    templateUrl: './chef-header.component.html',
    styleUrls: ['./chef-header.component.css']
})
export class ChefHeaderComponent implements OnInit {
    url: string = '';
    name: string = '';

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


    gotourl(link: string): void {
        if (link === '/chef/logout') {
            this.cService.chefLogout();
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
