import {Order} from "./order";
import {DeliveryPartner} from "./deliveryPartner";

export class Delivery {
    id: number | undefined;
    deliveryTime: Date | undefined;
    street: string | undefined;
    city: string | undefined;
    state: string | undefined;
    postalCode: string | undefined;
    status: string | undefined;
    order: Order | undefined;
    deliveryPartner: DeliveryPartner | undefined;
}