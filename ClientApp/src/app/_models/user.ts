import { Photo } from './photo';

export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    age: number;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    country: string;

    photos?: Photo[];
}
