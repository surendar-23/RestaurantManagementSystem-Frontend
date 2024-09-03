import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ChefService} from "../../services/chef.service";


@Component({
    selector: 'app-chef-home',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './chef-home.component.html',
    styleUrl: './chef-home.component.css'
})
export class ChefHomeComponent implements OnInit {
    name: string = '';

    constructor(
        private chefService: ChefService
    ) {
        if (this.chefService.getName() !== null) {
            this.name = this.chefService.getName();
        }
        //   this.chefService.isChefLoginPresent();
    }

    ngOnInit(): void {
    }
}
