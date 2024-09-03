import {Category} from "./category";
import {Restaurant} from "./restaurant";

export class MenuItem {
    id: number | undefined;
    name: string | undefined;
    price: number | undefined;
    category: Category | undefined;
    restaurant: Restaurant | undefined;
}
