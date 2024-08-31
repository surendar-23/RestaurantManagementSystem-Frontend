import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    gotoLogin(): void {
        this.route.navigate(['/user-login']).then(success => {
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

    constructor(private route: Router) {
    }

    ngOnInit(): void {
    }
}
