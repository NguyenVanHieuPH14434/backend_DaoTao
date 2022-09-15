import { MongoDB } from "../lib/mongodb";
import { CustomerSchema } from "./customer";

export class CustomerModel {
    constructor(private db : MongoDB){}

    async init () {}

    private col_customer = this.db.collection('customer');

    async ListCustomer (filter:any) {
        const docs = await this.col_customer.aggregate([{
            $match: filter
        }]).toArray();
        const count = await this.col_customer.find().count();
        return {docs:docs, count: count};
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