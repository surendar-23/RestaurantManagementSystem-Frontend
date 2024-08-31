export interface Accounting {
    id: number;
    date: Date;
    amount: number;
    ownerId: number;
    bills: Bill[];
}

export interface Bill {
    id: number;
}
