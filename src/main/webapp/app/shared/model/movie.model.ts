export interface IMovie {
    id?: number;
    title?: string;
    genre?: string;
    description?: string;
    imageContentType?: string;
    image?: any;
    qtyInStock?: number;
    price?: number;
}

export class Movie implements IMovie {
    constructor(
        public id?: number,
        public title?: string,
        public genre?: string,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public qtyInStock?: number,
        public price?: number
    ) {}
}
