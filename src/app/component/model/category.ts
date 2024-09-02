import {MenuItem} from "./menuItem";

export class Category {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    menuItems: MenuItem[] | undefined;
}