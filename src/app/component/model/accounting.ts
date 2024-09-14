import {Bill} from "./bill";
import {User} from "./user";

export class Accounting {
    id?: number;
    date?: Date;
    amount?: number;
    owner?: User;
    bills?: Bill[];
}
