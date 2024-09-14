import {Table} from "./table";
import {User} from "./user";

export class Order {
    id?: number;
    orderDate?: string;
    total?: number;
    customer?: User;
    restaurant?: User;
    table?: Table;
    waiter?: User;
}
