import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './component/home/home.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {ContactUsComponent} from "./component/contact-us/contact-us.component";
import {SupplierHomeComponent} from "./component/supplier/supplier-home/supplier-home.component";
import {UpdateInventoryItemComponent} from "./component/supplier/update-inventory-item/update-inventory-item.component";
import {ViewInventoryItemsComponent} from "./component/supplier/view-inventory-items/view-inventory-items.component";
import {ViewOrderDetailsComponent} from "./component/supplier/view-order-details/view-order-details.component";
import {ViewSupplyOrdersComponent} from "./component/supplier/view-supply-orders/view-supply-orders.component";
import {WaiterHomeComponent} from "./component/waiter/waiter-home/waiter-home.component";
import {CreateOrderComponent} from "./component/waiter/create-order/create-order.component";
import {UpdateOrderStatusComponent} from "./component/waiter/update-order-status/update-order-status.component";
import {UpdateTableDetailsComponent} from "./component/waiter/update-table-details/update-table-details.component";
import {ViewCurrentOrdersComponent} from "./component/waiter/view-current-orders/view-current-orders.component";
import {ViewTableDetailsComponent} from "./component/waiter/view-table-details/view-table-details.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'contact-us', component: ContactUsComponent},

    {
        path: 'supplier', children: [
            {path: 'home', component: SupplierHomeComponent},
            {path: 'update-inventory-item', component: UpdateInventoryItemComponent},
            {path: 'view-inventory-items', component: ViewInventoryItemsComponent},
            {path: 'view-order-details', component: ViewOrderDetailsComponent},
            {path: 'view-supply-details', component: ViewSupplyOrdersComponent}
        ]
    },

    {
        path: 'waiter', children: [
            {path: 'home', component: WaiterHomeComponent},
            {path: 'create-order', component: CreateOrderComponent},
            {path: 'update-order-status', component: UpdateOrderStatusComponent},
            {path: 'update-table-details', component: UpdateTableDetailsComponent},
            {path: 'view-current-orders', component: ViewCurrentOrdersComponent},
            {path: 'view-order-details', component: ViewSupplyOrdersComponent},
            {path: 'view-table-details', component: ViewTableDetailsComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

export {routes};
