import {Category} from "./category";
import {User} from "./user";

export class MenuItem {
    id?: number;
    name?: string;
    price?: number;
    category?: Category;
    restaurant?: User;
}
