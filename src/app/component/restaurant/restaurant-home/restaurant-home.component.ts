import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";

@Component({
    selector: 'app-restaurant-home',
    standalone: true,
    imports: [],
    templateUrl: './restaurant-home.component.html',
    styleUrl: './restaurant-home.component.css'
})
export class RestaurantHomeComponent implements OnInit {
    name: string = '';

    constructor(
        private ownerService: OwnerService
    ) {
        if (this.ownerService.getName() !== null) {
            this.name = this.ownerService.getName();
        }
        //   this.ownerService.isOwnerPresent();
    }

    ngOnInit(): void {
    }
}
