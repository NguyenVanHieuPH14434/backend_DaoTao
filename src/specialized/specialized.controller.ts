import { ObjectId } from 'mongodb';
import { SchemaSpecialized } from './specialized';
import { SpecializedModel } from './specialized.model';
import dayjs from 'dayjs';
export class SpecializedController {
    constructor(private model:SpecializedModel){}

    async init () {}

    async ListSpecialized (){
       return this.model.ListSpecialized();
    }

    async GetSpecialized (_id:ObjectId){
        const doc = await this.model.GetSpecialized(_id);
        return doc;
    }

    async CreateSpecialized (params:SchemaSpecialized.CreateSpecializedParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const specialized : SchemaSpecialized.Specialized = {
            specialized_name: params.specialized_name,
            ctime: nowFormat,
            utime: nowFormat
        }
         await this.model.CreateSpecialized(specialized);
        return specialized;
    } 

    async UpdateSpecialized (_id:ObjectId, params:SchemaSpecialized.UpdateSpecializedParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const specialized  = {...params}
        specialized.utime = nowFormat;
        await this.model.UpdateSpecialized(_id, specialized);
        return specialized;
    }

    async DeleteSpecialized (_id:ObjectId){
        const doc = await this.model.GetSpecialized(_id);
        await this.model.DeleteSpecialized(_id);
        return doc;
    }
}