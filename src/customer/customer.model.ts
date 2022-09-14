import { MongoDB } from "../lib/mongodb";
import { CustomerSchema } from "./customer";

export class CustomerModel {
    constructor(private db : MongoDB){}

    async init () {}

    private col_customer = this.db.collection('customer');

    async ListCustomer () {
        const docs = await this.col_customer.find().toArray();
        return docs;
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