export namespace SchemaSpecialized {
    export interface Specialized{
        specialized_name: string
        ctime:string;
        utime:string;
    }

    export interface CreateSpecializedParams {
        specialized_name: string
    }

    export interface UpdateSpecializedParams {
        specialized_name?: string
        utime?:string;
    }
    
}