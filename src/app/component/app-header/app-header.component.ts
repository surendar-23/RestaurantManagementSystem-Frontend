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
        {path: '/user-login', label: 'Login', icon: 'fas fa-user-circle'},
        {path: '/user-signup', label: 'Sign Up', icon: 'fas fa-user-circle'}
    ];

    constructor(private route: Router) {
        this.url = this.route.url;
    }

    gotourl(url: string): void {
        this.route.navigate(["/" + url]).then(success => {
            if (success) {
                console.log('Navigation successful!');
                this.url = "/" + url;
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
