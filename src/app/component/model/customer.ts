import {Order} from "./order";

export class Customer {
    id: | undefined;
    name: string | undefined;
    email?: string | undefined;
    phone: string | undefined;
    orders?: Order[] | undefined;
}