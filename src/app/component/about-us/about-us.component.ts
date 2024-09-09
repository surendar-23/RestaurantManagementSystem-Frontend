import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    standalone: true,
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
    constructor(private router: Router) {
    }

    goToUrl(url: string): void {
        this.router.navigate(['/' + url]).then(success => {
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
