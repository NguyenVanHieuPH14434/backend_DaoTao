import { CustomerController } from './customer.controller';
import * as express from 'express';
import { CustomerSchema } from './customer';

export function NewCustomerAPI(customerController: CustomerController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const docs = await customerController.ListCustomer();
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const params : CustomerSchema.CreateCustomerParams= {
            NameCTV: req.body.NameCTV,
            Department: req.body.Department,
            Specialized: req.body.Specialized
        };

        const doc = await customerController.CreateCustomer(params);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=>{
        const params : CustomerSchema.UpdateCustomerParams= {
            Department: req.body.Department,
            Specialized: req.body.Specialized
        };

        const doc = await customerController.UpdateCustomer(req.params._id, params);
        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await customerController.GetCustomer(req.params._id);
       res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await customerController.DeleteCustomer(req.params._id);
        res.json({status: 200, message: "Delete success", data: doc});
    });

    return router;
}