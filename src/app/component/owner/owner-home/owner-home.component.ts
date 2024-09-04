import {Component, OnInit} from '@angular/core';
import {OwnerService} from "../../services/owner.service";
import {NgOptimizedImage} from "@angular/common";
import {Owner} from "../../model/owner";

@Component({
    selector: 'app-owner-home',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './owner-home.component.html',
    styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent implements OnInit {
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
