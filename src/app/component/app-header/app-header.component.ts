import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-app-header',
    standalone: true,
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

    url: string = '/';

    constructor(private route: Router) {
    }

    gotourl(url: string): void {
        this.route.navigate(["/" + url]).then(success => {
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
