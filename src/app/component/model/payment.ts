import {Order} from "./order";

export class Payment {
    id: number | undefined;
    paymentDate: Date | undefined;
    amount: number | undefined;
    order: Order | undefined;
}