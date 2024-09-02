import {Restaurant} from "./restaurant";
import {Delivery} from "./delivery";

export class DeliveryPartner {
    id: number | undefined;
    name: string | undefined;
    contactNumber: string | undefined;
    restaurant: Restaurant | undefined;
    deliveries?: Delivery[] | undefined;
}