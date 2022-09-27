import { ObjectId } from 'mongodb';
import { SpecializedController } from './specialized.controller';
import express from 'express';
import { SchemaSpecialized } from './specialized';

export function NewSpecializedAPI (specializedController: SpecializedController){
    const router = express.Router();    

    router.get('/list', async(req, res)=>{
        const docs = await specializedController.ListSpecialized();
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const params : SchemaSpecialized.CreateSpecializedParams = {
            specialized_name: req.body.specialized_name
        };
       const doc = await specializedController.CreateSpecialized(params);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=>{
        const params : SchemaSpecialized.UpdateSpecializedParams={
            specialized_name: req.body.specialized_name
        };

        const doc = await specializedController.UpdateSpecialized(new ObjectId(req.params._id), params);
        res.json(doc);
    }); 

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await specializedController.GetSpecialized(new ObjectId(req.params._id));
        res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res)=>{
        await specializedController.DeleteSpecialized(new ObjectId(req.params._id));
        res.json({status:200, message:"Delete Success!"});
    });

    return router;
}