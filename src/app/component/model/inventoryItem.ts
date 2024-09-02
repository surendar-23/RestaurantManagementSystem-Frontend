export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    restaurant?: {
        id: number;
    };
    supplier?: {
        id: number;
    };
}
