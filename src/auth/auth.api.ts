import { MustBeOneOf } from './../common/http';
import { verifyToken } from './../common/verifyToken';
import { AuthController } from './auth.controller';
import * as express from 'express';
import { AuthSchema } from './auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';


export function NewAuthAPI (authController: AuthController){
    const router = express.Router();
    let gender = Object.values(AuthSchema.Gender);


    router.get('/user/list', async(req, res)=>{
        const docs = await authController.ListUser();
        res.json(docs);
    })

    router.post('/user/create', async(req, res)=>{
        const checkExits = await authController.CheckExits(req.body.username);
        let newGender = MustBeOneOf(gender, req.body.gender, 'gender', res);
        if(checkExits){
            res.json({status:201, message:"Username Exits"});
        }else {
            const getRole = req.body.roles;
            const roles : AuthSchema.Role[] = Array.from(new Set(getRole));
            const params : AuthSchema.CreateUserParams ={
                username: req.body.username,
                full_name: req.body.full_name,
                password:req.body. password,
                email: req.body.email,
                phone: req.body.phone,
                roles: roles,
                gender: newGender
            };
            const doc = await authController.CreateUser(params);
            res.json(doc);
        }
    });

    router.post('/user/update/:_id', async(req, res)=>{
            const getRole = [req.body.roles];
            let newGender = MustBeOneOf(gender, req.body.gender, 'gender', res);
            const roles : AuthSchema.Role[] = Array.from(new Set(getRole));
            const params : AuthSchema.UpdateUserParams = {
                full_name: req.body.full_name,
                phone: req.body.phone,
                roles: roles,
                gender: newGender
            }
            const doc = await authController.UpdateUser(req.params._id, params);
            res.json(doc);
    });

    router.get('/user/edit/:_id', async(req, res)=>{
        const doc = await authController.GetUser(req.params._id);
        return res.json(doc);
    });

    router.delete('/user/delete/:_id', async(req, res)=>{
        const doc = await authController.DeleteUser(req.params._id);
        return res.json({status: 200, message:"Delete success", doc:doc});
    });

    router.post('/login', async(req, res)=>{
        const user = await authController.CheckExits(req.body.username);
        if(!user){
         return res.json({status:201, message:"Username không tồn tại!"});
        }
        const veryPassword = await bcrypt.compare(req.body.password,user?.password);
        if(!veryPassword){
          return res.json({status:201, message:"Mật khẩu không đúng!"});
        }
        if(user && veryPassword){
            const accesstoken = jwt.sign({userId: user._id}, typeof process.env.ACCESSTOKEN);
            user.accesstoken = accesstoken;
            return res.json({data:{_id:user._id, username: user.username, full_name: user.full_name, roles:user.roles, accesstoken: accesstoken}});
        }
    });

    return router;
}