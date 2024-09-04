import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-customer-home',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './customer-home.component.html',
    styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent implements OnInit {

    name: string = '';

    constructor(
        private cusService: CustomerService
    ) {
        if (this.cusService.getName() !== null) {
            this.name = this.cusService.getName();
        }
        //     this.cusService.isCustomerLoginPresent();
    }

    ngOnInit(): void {
    }

}
