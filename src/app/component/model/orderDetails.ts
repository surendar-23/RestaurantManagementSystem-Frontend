import {Bill} from "./bill";
import {MenuItem} from "./menuItem";
import {Order} from "./order";

export class OrderDetails {
    id: number | undefined;
    orderDate: Date | undefined;
    totalAmount: number | undefined;
    bill: Bill | undefined;
    menuItem: MenuItem | undefined;
    order: Order | undefined;
}