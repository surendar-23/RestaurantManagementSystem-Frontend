import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
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
export class AppHeaderComponent implements OnInit {

    url: string = '/';

    navItems = [
        {path: '/', label: 'Home', icon: 'fas fa-home'},
        {path: '/about-us', label: 'About Us', icon: 'fas fa-address-card'},
        {path: '/contact-us', label: 'Contact Us', icon: 'fas fa-id-badge'},
        {path: '/user-login', label: 'Login', icon: 'fas fa-user-circle'},
        {path: '/user-signup', label: 'Sign Up', icon: 'fas fa-user-circle'}
    ];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        // Subscribe to router events to update the URL
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.url = event.urlAfterRedirects;
            }
        });
    }

    gotourl(url: string): void {
        this.router.navigate([url]).then(success => {
            if (success) {
                console.log('Navigation successful!');
                this.url = url;
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
