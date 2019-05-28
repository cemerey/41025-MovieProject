import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IUserExtra {
    id?: number;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Moment;
    user?: IUser;
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public address?: string,
        public dateOfBirth?: Moment,
        public user?: IUser
    ) {}
}
