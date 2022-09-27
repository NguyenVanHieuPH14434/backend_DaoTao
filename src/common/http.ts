export const MustBeOneOf = (object:any, value:string, key:string, res:any)=>{
    for (let i = 0; i < object.length; i++) {
        if(object[i] == value){
            return object[i];   
        }
    }
   res.json((`${key} must be one of ${object.join(',')}`));
}