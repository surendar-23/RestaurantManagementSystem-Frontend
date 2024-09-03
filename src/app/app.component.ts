import {Component} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {AppHeaderComponent} from "./component/app-header/app-header.component";
import {SupplierHeaderComponent} from "./component/supplier/supplier-header/supplier-header.component";
import {SupplierHomeComponent} from "./component/supplier/supplier-home/supplier-home.component";
import {filter} from "rxjs";
import {WaiterHeaderComponent} from "./component/waiter/waiter-header/waiter-header.component";
import {
    DeliveryPartnerHeaderComponent
} from "./component/delivery-partner/delivery-partner-header/delivery-partner-header.component";
import {ChefHeaderComponent} from "./component/chef/chef-header/chef-header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, AppHeaderComponent, SupplierHeaderComponent, SupplierHomeComponent, WaiterHeaderComponent, DeliveryPartnerHeaderComponent, ChefHeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Frontend';

    constructor(
        private route: Router
    ) {
        this.route.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
        })

    }

}