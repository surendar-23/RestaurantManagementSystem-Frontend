import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {AppHeaderComponent} from './component/app-header/app-header.component';
import {SupplierHeaderComponent} from './component/supplier/supplier-header/supplier-header.component';
import {SupplierHomeComponent} from './component/supplier/supplier-home/supplier-home.component';
import {WaiterHeaderComponent} from './component/waiter/waiter-header/waiter-header.component';
import {
    DeliveryPartnerHeaderComponent
} from './component/delivery-partner/delivery-partner-header/delivery-partner-header.component';
import {ChefHeaderComponent} from './component/chef/chef-header/chef-header.component';
import {CustomerHeaderComponent} from './component/customer/customer-header/customer-header.component';
import {OwnerHeaderComponent} from './component/owner/owner-header/owner-header.component';
import {RestaurantHeaderComponent} from './component/restaurant/restaurant-header/restaurant-header.component';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {RestaurantService} from './component/services/restaurant.service';
import {AuthService} from "./component/services/auth.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FooterComponent,
        AppHeaderComponent,
        SupplierHeaderComponent,
        SupplierHomeComponent,
        WaiterHeaderComponent,
        DeliveryPartnerHeaderComponent,
        ChefHeaderComponent,
        CustomerHeaderComponent,
        OwnerHeaderComponent,
        RestaurantHeaderComponent,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Frontend';
    role: string | null = null;
    isLoggedIn: boolean = false;
    isOwnerLoggedIn: boolean = false;

    constructor(
        private route: Router,
        private rService: RestaurantService,
        protected authService: AuthService) {
        this.role = this.authService.getUserRole(); // Fetch the role
    }

    // Method to update the role and header visibility based on user role
    updateRoleAndState(): void {
        const userRole = this.rService.getUserRole();
        this.role = userRole; // Update role used in template

        if (userRole === 'chef' || userRole === 'supplier' || userRole === 'waiter' || userRole === 'delivery-partner' || userRole === 'customer' || userRole === 'restaurant') {
            setTimeout(() => {
                this.isLoggedIn = true;
                this.isOwnerLoggedIn = false;
            }, 100);
        } else if (userRole === 'owner') {
            setTimeout(() => {
                this.isLoggedIn = false;
                this.isOwnerLoggedIn = true;
            }, 100);
        } else {
            // Default state for non-logged in users
            setTimeout(() => {
                this.isLoggedIn = false;
                this.isOwnerLoggedIn = false;
            }, 1);
        }
    }
}
