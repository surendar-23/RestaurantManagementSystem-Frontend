import {Accounting} from "./accounting";

export class Bill {
    id: number | undefined;
    date: Date | undefined;
    amount: number | undefined;
    accounting: Accounting | undefined;
    description?: string | undefined;
}