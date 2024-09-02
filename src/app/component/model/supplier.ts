import {InventoryItem} from "./inventoryItem";

export class Supplier {
    id: number | undefined;
    name: string | undefined;
    contactInformation: string | undefined;
    inventoryItems?: InventoryItem[] | undefined;
}