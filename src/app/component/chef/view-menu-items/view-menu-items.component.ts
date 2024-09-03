import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ChefService} from '../../services/chef.service';
import {MenuItem} from "../../model/menuItem";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-view-menu-items',
    standalone: true,
    templateUrl: './view-menu-items.component.html',
    imports: [
        NgIf,
        NgForOf
    ],
    styleUrls: ['./view-menu-items.component.css']
})
export class ViewMenuItemsComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private chefService: ChefService) {
    }

    ngOnInit(): void {
        this.getMenuItems();
    }

    getMenuItems(): void {
        this.chefService.getMenuItem().pipe(take(1)).subscribe(
            (res: any) => {
                if (res && Array.isArray(res)) {
                    this.menuItems = res;
                } else {
                    console.error("Unexpected response format:", res);
                }
            },
            (err) => {
                console.error("Error fetching menu items:", err);
            }
        );
    }
}
