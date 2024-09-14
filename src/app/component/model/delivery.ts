import {Order} from './order';
import {User} from "./user";

export class Delivery {
    id?: number;
    deliveryTime?: Date;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    status?: string;
    order?: Order;
    deliveryPartner?: User;
}
