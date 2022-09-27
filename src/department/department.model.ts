import { ObjectId } from "mongodb";
import { type } from "os";
import { MongoDB } from "../lib/mongodb";
import { SchemaDepartment } from "./department";

export class DepartmentModel {
    constructor (private db:MongoDB){}

    async init (){

    }

    private col_department = this.db.collection('department');

    async ListDepartment (){
        const docs = await this.col_department.find().sort({ctime:-1}).toArray();
        return docs;
    }

    async GetDepartment (_id:ObjectId){
        const doc = await this.col_department.findOne({_id:_id});
        return doc;
    }

    async CreateDepartment (department:SchemaDepartment.CreateDepartmentParams){
        const doc = await this.col_department.insertOne(department);
        return doc;
    } 

    async UpdateDepartment (_id:ObjectId, department:SchemaDepartment.UpdateDepartmentParams){
        const doc = await this.col_department.updateOne({_id:_id}, {$set:department});
        return doc;
    }

    async DeleteDepartment (_id:ObjectId){
        const doc = await this.col_department.deleteOne({_id:_id});
        return doc;
    }
}