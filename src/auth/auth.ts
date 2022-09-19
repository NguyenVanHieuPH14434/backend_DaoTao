import rand from "../lib/rand";

export namespace AuthSchema {
    export enum Role {
        ADMIN = 'admin',
        CTV = 'ctv'
    }

    export enum Gender {
        MALE = 'male',
        FEMALE = 'female'
    }

    export interface User {
        _id: string;
        username:string;
        full_name:string;
        password:string;
        email:string;
        phone: string;
        roles: Role[];
        gender: string;
        ctime:string;
        utime:string;
    }

    export interface CreateUserParams {
        username:string;
        full_name:string;
        password:string;
        email:string;
        phone: string;
        roles:Array<Role>
        gender: string;
    }

    export interface UpdateUserParams {
        full_name?:string;
        phone?: string;
        roles?: Array<Role>;
        gender?: string;
        utime?:string;
    }

    export const Errors = {
        ErrUserNotFound: new Error("Username not found"),
        ErrUsernameExisted: new Error("Username existed"),
      };
    export const Generate = {
        NewUserId:() => rand.uppercase(14) 
    }
}