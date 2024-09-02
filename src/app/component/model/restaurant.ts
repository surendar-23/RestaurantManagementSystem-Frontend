import {Address} from "./address";
import {Owner} from "./owner";
import {Table} from "./table";
import {Waiter} from "./waiter";
import {MenuItem} from "./menuItem";
import {InventoryItem} from "./inventoryItem";
import {DeliveryPartner} from "./deliveryPartner";

export class Restaurant {
    id: number | undefined;
    name: string | undefined;
    address: Address | undefined;
    owner: Owner | undefined;
    tables?: Table[] | undefined;
    waiters?: Waiter[] | undefined;
    menuItems?: MenuItem[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    deliveryPartners?: DeliveryPartner[] | undefined;
}