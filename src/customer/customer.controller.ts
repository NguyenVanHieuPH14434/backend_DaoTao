import { CustomerSchema } from './customer';
import { CustomerModel } from './customer.model';
import dayjs from 'dayjs';

export class CustomerController {
    constructor(private model: CustomerModel){}

    async init (){}

    async ListCustomer (filter:any){
    
        return this.model.ListCustomer(filter);
    }

    async GetCustomer(_id:string){
        const doc = await this.model.GetCustomer(_id);
        return doc;
    }

    async CreateCustomer (params: CustomerSchema.CreateCustomerParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const customer : CustomerSchema.Customer= {
            _id: CustomerSchema.Generate.NewCustomerId(),
            linkfb:params.linkfb,
            NameCTV: params.NameCTV,
            Department: params.Department,
            Specialized: params.Specialized,
            ctime: nowFormat,
            utime: nowFormat
        };
        await this.model.CreateCustomer(customer);
        return customer;
    }

    async CheckExits (linkfb:string, Department:string){
        const doc = await this.model.CheckExits(linkfb, Department);
        return doc;
    }

    async UpdateCustomer (_id:string, params: CustomerSchema.UpdateCustomerParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const customer = {...params};
        customer.utime = nowFormat;
        await this.model.UpdateCustomer(_id, customer);
        return customer;
    }

    async DeleteCustomer (_id:string){
        const doc = await this.GetCustomer(_id);
        await this.model.DeleteCustomer(_id);
        return doc;
    }
}