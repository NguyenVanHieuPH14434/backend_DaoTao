import { ObjectId } from "mongodb";
import { MongoDB } from "../lib/mongodb";
import { SchemaSpecialized } from "./specialized";

export class SpecializedModel {
    constructor (private db:MongoDB){}

    async init (){

    }

    private col_specialized = this.db.collection('specialized');

    async ListSpecialized (){
        const docs = await this.col_specialized.find().sort({ctime:-1}).toArray();
        return docs;
    }

    async GetSpecialized (_id:ObjectId){
        const doc = await this.col_specialized.findOne({_id: _id});
        return doc;
    }

    async CreateSpecialized (specialized:SchemaSpecialized.CreateSpecializedParams){
        const doc = await this.col_specialized.insertOne(specialized);
        return doc;
    } 

    async UpdateSpecialized (_id:ObjectId, specialized:SchemaSpecialized.UpdateSpecializedParams){
        const doc = await this.col_specialized.updateOne({_id:_id}, {$set:specialized});
        return doc;
    }

    async DeleteSpecialized (_id:ObjectId){
        const doc = await this.col_specialized.deleteOne({_id:_id});
        return doc;
    }
}