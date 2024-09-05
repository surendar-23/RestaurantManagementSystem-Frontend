import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {Waiter} from "../../model/waiter";
import {Restaurant} from "../../model/restaurant";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-create-waiter',
    templateUrl: './create-waiter.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
    styleUrls: ['./create-waiter.component.css']
})
export class CreateWaiterComponent implements OnInit {
    waiter: Waiter = new Waiter();
    restaurantId: number | undefined;
    successMessage: string | undefined;
    errorMessage: string | undefined;

    constructor(private ownerService: OwnerService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.restaurantId) {
            const restaurant = new Restaurant();
            restaurant.id = this.restaurantId;
            this.waiter.restaurant = restaurant;

            this.ownerService.createWaiter(this.waiter).subscribe({
                next: (response) => {
                    this.successMessage = 'Waiter created successfully!';
                    this.errorMessage = undefined;
                },
                error: (err) => {
                    this.errorMessage = 'Failed to create waiter. Please try again.';
                    this.successMessage = undefined;
                }
            });
        } else {
            this.errorMessage = 'Restaurant ID is required.';
        }
    }
}
