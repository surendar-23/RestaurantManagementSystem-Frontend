import {Component, OnInit} from '@angular/core';
import {WaiterService} from "../../services/waiter.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-waiter-home',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './waiter-home.component.html',
    styleUrl: './waiter-home.component.css'
})
export class WaiterHomeComponent implements OnInit {

    name: string = '';

    constructor(
        private wService: WaiterService
    ) {
        if (this.wService.getName() !== null) {
            this.name = this.wService.getName();
        }
        //     this.wService.isWaiterLoginPresent();
    }

    ngOnInit(): void {
    }

}
