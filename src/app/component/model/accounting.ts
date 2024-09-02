import {Bill} from "./bill";
import {Owner} from "./owner";

export class Accounting {
    id: number | undefined;
    date: Date | undefined;
    amount: number | undefined;
    owner: Owner | undefined;
    bills: Bill[] | undefined;
}