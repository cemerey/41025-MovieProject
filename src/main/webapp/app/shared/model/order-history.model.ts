import { Moment } from 'moment';

export interface IOrderHistory {
    id?: number;
    accountName?: string;
    orderStatus?: string;
    orderDate?: Moment;
    movieTitle?: string;
    quantity?: number;
    price?: number;
}

export class OrderHistory implements IOrderHistory {
    constructor(
        public id?: number,
        public accountName?: string,
        public orderStatus?: string,
        public orderDate?: Moment,
        public movieTitle?: string,
        public quantity?: number,
        public price?: number
    ) {}
}
