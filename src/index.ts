import { CustomerController } from './customer/customer.controller';
import { CustomerModel } from './customer/customer.model';
import express from 'express';
import cors from 'cors';
import { ReadConfig } from './config';
import { MongoCommon } from './lib/mongodb';
import { NewCustomerAPI } from './customer/customer.api';

export async function main() {
    const config = await ReadConfig();
    console.log(config);
    const client = await MongoCommon.Connect(`${config.database.db_url}`, {replica:true});
    console.log('Connected to database');

    const database = client.db(config.database.db_name);

    const customerModel = new CustomerModel(database);
    await customerModel.init();
    const customerController = new CustomerController(customerModel);
    await customerController.init();
    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(express.json());
    app.use(cors());
    app.disable("x-powered-by");

    app.use('/api/customer', NewCustomerAPI(customerController));

    app.listen(PORT, ()=>{
        console.log('Server running!');
        
    })
    
}

main();