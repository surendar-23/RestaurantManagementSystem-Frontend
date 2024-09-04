import {Order} from './order'; // Adjust path as necessary

export class Payment {
    id?: number;
    paymentDate?: Date;
    amount?: number;
    order?: Order;
}
