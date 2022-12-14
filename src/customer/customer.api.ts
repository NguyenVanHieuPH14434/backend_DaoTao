import { CustomerController } from './customer.controller';
import * as express from 'express';
import { CustomerSchema } from './customer';
import { count } from 'console';
import dayjs from 'dayjs';

export function NewCustomerAPI(customerController: CustomerController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        let filter = {};
        if(req.query.NameCTV){
            const NameCTV = req.query.NameCTV;
            filter = {NameCTV};
        }
        const docs = await customerController.ListCustomer(filter);
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const check = await customerController.CheckExits(req.body.linkfb, req.body.Department);
        if(check){
            return res.json({message:'Học viên đã tồn tại trong phòng ban này!'});
        }else {
            const params : CustomerSchema.CreateCustomerParams= {
                linkfb: req.body.linkfb,
                NameCTV: req.body.NameCTV,
                Department: req.body.Department,
                Specialized: req.body.Specialized
            };
    
            const doc = await customerController.CreateCustomer(params);
            res.json(doc);
        }
      
    });

    router.post('/update/:_id', async(req, res)=>{
        const params : CustomerSchema.UpdateCustomerParams= {
            linkfb: req.body.linkfb,
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