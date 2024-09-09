import {Routes} from '@angular/router';
import {SupplierHomeComponent} from "./component/supplier/supplier-home/supplier-home.component";
import {WaiterHomeComponent} from "./component/waiter/waiter-home/waiter-home.component";
import {
    DeliveryPartnerHomeComponent
} from "./component/delivery-partner/delivery-partner-home/delivery-partner-home.component";
import {ChefHomeComponent} from "./component/chef/chef-home/chef-home.component";
import {CustomerHomeComponent} from "./component/customer/customer-home/customer-home.component";
import {OwnerHomeComponent} from "./component/owner/owner-home/owner-home.component";
import {RestaurantHomeComponent} from "./component/restaurant/restaurant-home/restaurant-home.component";

export const routes: Routes = [
    {path: 'supplier/home', component: SupplierHomeComponent},
    {path: 'waiter/home', component: WaiterHomeComponent},
    {path: 'delivery-partner/home', component: DeliveryPartnerHomeComponent},
    {path: 'chef/home', component: ChefHomeComponent},
    {path: 'customer/home', component: CustomerHomeComponent},
    {path: 'owner/home', component: OwnerHomeComponent},
    {path: 'restaurant/home', component: RestaurantHomeComponent},

];
