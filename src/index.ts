import { DepartmentController } from './department/department.controller';
import { DepartmentModel } from './department/department.model';
import { SpecializedController } from './specialized/specialized.controller';
import { SpecializedModel } from './specialized/specialized.model';
import { AuthController } from './auth/auth.controller';
import { AuthModel } from './auth/auth.model';
import { CustomerController } from './customer/customer.controller';
import { CustomerModel } from './customer/customer.model';
import express from 'express';
import cors from 'cors';
import { ReadConfig } from './config';
import { MongoCommon } from './lib/mongodb';
import { NewCustomerAPI } from './customer/customer.api';
import { NewAuthAPI } from './auth/auth.api';
import { NewSpecializedAPI } from './specialized/specialized.api';
import { NewDepartmentAPI } from './department/department.api';

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

    const authModel = new AuthModel(database);
    await authModel.init();
    const authController = new AuthController(authModel);
    await authController.init();

    const specializedModel = new SpecializedModel(database);
    await specializedModel.init();
    const specializedController = new SpecializedController(specializedModel);
    await specializedController.init();

    const departmentModel = new DepartmentModel(database);
    await departmentModel.init();
    const departmentController = new DepartmentController(departmentModel);
    await departmentController.init();

    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(express.json());
    app.use(cors());
    app.disable("x-powered-by");

    app.use('/api/customer', NewCustomerAPI(customerController));
    app.use('/api/auth', NewAuthAPI(authController));
    app.use('/api/specialized', NewSpecializedAPI(specializedController));
    app.use('/api/department', NewDepartmentAPI(departmentController));

    app.listen(PORT, ()=>{
        console.log('Server running!');
        
    })
    
}

main();