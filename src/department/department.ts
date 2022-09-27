export namespace SchemaDepartment {
    export interface Department{
        department_name: string
        ctime:string;
        utime:string;
    }

    export interface CreateDepartmentParams {
        department_name: string
    }

    export interface UpdateDepartmentParams {
        department_name?: string
        utime?:string;
    }
    
}