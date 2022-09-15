import rand from "../lib/rand";

export namespace CustomerSchema {
    export interface Customer {
        _id: string;
        linkfb:string;
        NameCTV: string;
        Department:string;
        Specialized:string;
        ctime:string;
        utime:string;
    }

    export interface CreateCustomerParams {
        linkfb:string;
        NameCTV: string;
        Department:string;
        Specialized:string;
    }

    export interface UpdateCustomerParams {
        linkfb?:string;
        Department?:string;
        Specialized?:string;
        utime? :string;
    }

    export const Generate = {
        NewCustomerId: ()=>rand.uppercase(14)
    }
}