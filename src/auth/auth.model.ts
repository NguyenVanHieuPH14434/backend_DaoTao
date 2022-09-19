import { ErrorCodes, MongoError } from './../lib/mongodb';
import { MongoDB } from "../lib/mongodb";
import { AuthSchema } from "./auth";
import { Code } from 'mongodb';
import { userInfo } from 'os';

export class AuthModel {
    constructor(private db:MongoDB){}

    async init() {}

    private col_user = this.db.collection('user');

    async ListUser() {
        const docs = await this.col_user.aggregate().toArray();
        return docs;
    }

    async GetUser (_id:string){
        const doc = await this.col_user.findOne({_id:_id});
        return doc;
    }

    async CreateUser (user: AuthSchema.CreateUserParams){
       try {
        const doc = await this.col_user.insertOne(user);
        return doc;
       } catch (err:any) {
                throw err;
       }
    }

    async CheckExits (username: string){
        const doc = await this.col_user.findOne({username: username});
        return doc;
    }

    async UpdateUser (_id:string, user: AuthSchema.UpdateUserParams){
        const doc = await this.col_user.updateOne({_id:_id}, {$set:user});
        return doc;
    }

    async DeleteUser(_id:string){
        const doc = await this.col_user.deleteOne({_id:_id});
        return doc;
    }

  
}