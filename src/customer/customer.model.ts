import { MongoDB } from "../lib/mongodb";
import { CustomerSchema } from "./customer";

export class CustomerModel {
    constructor(private db : MongoDB){}

    async init () {}

    private col_customer = this.db.collection('customer');

    async ListCustomer (filter:any,perPage:number, page:number) {
        const docs = await this.col_customer.find(filter).skip((perPage * page) - perPage).limit(perPage).toArray();
        const count = await this.col_customer.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count: count, totalPage:totalPage};
    }

    async GetCustomer (_id:string){
        const doc = await this.col_customer.findOne({_id:_id});
        return doc;
    }

    async CreateCustomer (customer: CustomerSchema.CreateCustomerParams){
        const doc = await this.col_customer.insertOne(customer);
        return doc;
    }

    async UpdateCustomer(_id:string, customer: CustomerSchema.UpdateCustomerParams){
        const doc = await this.col_customer.updateOne({_id:_id}, {$set:customer});
        return doc;
    }

    async DeleteCustomer (_id:string){
        const doc = await this.col_customer.deleteOne({_id:_id});
        return doc;
    }
}