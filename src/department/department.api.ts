import { ObjectId } from 'mongodb';
import { DepartmentController } from './department.controller';
import express from 'express';
import { SchemaDepartment } from './department';

export function NewDepartmentAPI (departmentController:DepartmentController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const docs = await departmentController.ListDepartment();
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const parmas : SchemaDepartment.CreateDepartmentParams = {
            department_name: req.body.department_name,
        };
        const doc = await departmentController.CreateDepartment(parmas);
        res.json(doc);
    }); 

    router.post('/update/:_id', async(req, res)=>{
        const params : SchemaDepartment.UpdateDepartmentParams ={
            department_name: req.body.department_name,
        };
        const doc = await departmentController.UpdateDepartment(new ObjectId(req.params._id), params);
        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await departmentController.GetDepartment(new ObjectId(req.params._id));
        res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res)=>{
        await departmentController.DeleteDepartment(new ObjectId(req.params._id));
        res.json({status:200, message:'Delete Success!'});
    });

    return router;
}