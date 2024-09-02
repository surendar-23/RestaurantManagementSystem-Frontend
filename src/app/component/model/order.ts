// order.model.ts
import {Customer} from "./customer";
import {Restaurant} from "./restaurant";
import {Table} from "./table";
import {Waiter} from "./waiter";

export class Order {
    id?: number;
    orderDate?: string;
    total?: number;
    customer?: Customer;
    restaurant?: Restaurant;
    table?: Table;
    waiter?: Waiter;
}
