import { ObjectId } from 'mongodb';
import { SchemaDepartment } from './department';
import { DepartmentModel } from './department.model';
import dayjs from 'dayjs';
export class DepartmentController {
    constructor (private model:DepartmentModel){}

    async init () {}

    async ListDepartment (){
        return this.model.ListDepartment();
    }

    async GetDepartment (_id:ObjectId){
        const doc = await this.model.GetDepartment(_id);
        return doc;
    }

    async CreateDepartment (params:SchemaDepartment.CreateDepartmentParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const department : SchemaDepartment.Department = {
            department_name: params.department_name,
            ctime: nowFormat,
            utime: nowFormat
        }
        await this.model.CreateDepartment(department);
        return department;
    } 

    async UpdateDepartment (_id:ObjectId, params:SchemaDepartment.UpdateDepartmentParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const department = {...params};
        department.utime = nowFormat;
        await this.model.UpdateDepartment(_id, department);
        return department;
    }
    
    async DeleteDepartment (_id:ObjectId){
        const doc = await this.model.GetDepartment(_id);
        await this.model.DeleteDepartment(_id);
        return doc;
    }
}