import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-app-header',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
    constructor(private router: Router) {
    }

    navigateToAboutUs() {
        this.router.navigate(['/about-us']).then(success => {
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
