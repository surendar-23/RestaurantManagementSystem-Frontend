import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
    url: string = '/about-us';

    constructor(private route: Router) {
    }

    goToUrl(url: string): void {
        this.route.navigate(['/' + url]).then(success => {
            if (success) {
                console.log('Navigation is successful!');
            } else {
                console.log('Navigation has failed!');
            }
        })
            .catch(err => {
                console.error('Navigation error:', err);
            });
    }
}
