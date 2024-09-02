import {Address} from "./address";
import {Restaurant} from "./restaurant";
import {Accounting} from "./accounting";

export class Owner {
    id: number | undefined;
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    address: Address | undefined;
    restaurants?: Restaurant[] | undefined;
    accountings?: Accounting[] | undefined;
}