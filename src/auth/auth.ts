import { EphemeralKeyInfo } from "tls";
import rand from "../lib/rand";

export namespace AuthSchema {
    export enum Role {
        ADMIN = 'admin',
        CTV = 'ctv'
    }

    export enum Gender {
        MALE = 'male',
        FEMALE = ' female'
    }

    export interface User {
        _id: string;
        username:string;
        full_name:string;
        email:string;
        phone: string;
        roles: Role[];
        gender: Gender;
        ctime:string;
        utime:string;
    }

    export interface CreateUserParams {
        username:string;
        full_name:string;
        email:string;
        phone: string;
        roles: Role[];
        gender: Gender;
    }

    export interface UpdateUserParams {
        full_name?:string;
        phone?: string;
        roles?: Role[];
        gender?: Gender;
        utime?:string;
    }

    export const Generate = {
        NewUserId:() => rand.uppercase(14) 
    }
}