import {Order} from "./order";

export class OrderItem {
    id: number | undefined;
    quantity: number | undefined;
    price: number | undefined;
    order: Order | undefined;
}