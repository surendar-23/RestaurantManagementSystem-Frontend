import {Order} from "./order";

export class Feedback {
    id: number | undefined;
    comment: string | undefined;
    rating: number | undefined;
    order: Order | undefined;
}
