import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-supplier-home',
    templateUrl: './supplier-home.component.html',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    styleUrls: ['./supplier-home.component.css']
})
export class SupplierHomeComponent implements OnInit {

    name: string = '';

    constructor(
        private supService: SupplierService
    ) {
        if (this.supService.getName() !== null) {
            this.name = this.supService.getName();
        }
        // this.supService.isSupplierLoginPresent();
    }


    ngOnInit(): void {
    }
}
