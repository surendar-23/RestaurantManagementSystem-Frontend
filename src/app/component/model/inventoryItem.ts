import {User} from "./user";

export class InventoryItem {
    id: number | undefined;
    name: string | undefined;
    quantity: number | undefined;
    restaurant?: User;
    supplier?: User
}
