import { AuthSchema } from './auth';
import { AuthModel } from './auth.model';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';
export class AuthController {
    constructor(private model:AuthModel){}

    async init () {}

    async ListUser (){
        return this.model.ListUser();
    }

    async GetUser (_id:string){
        const doc = await this.model.GetUser(_id);
        return doc;
    }

    async CheckExits (username:string){
        const doc = await this.model.CheckExits(username);
        return doc;
    }

    async CreateUser (params: AuthSchema.CreateUserParams){
        const now = dayjs();
        const hashPassword = await bcrypt.hash(params.password, 8);
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const user : AuthSchema.User={
            _id: AuthSchema.Generate.NewUserId(),
            username: params.username,
            full_name: params.full_name,
            password: hashPassword,
            email: params.email,
            phone: params.phone,
            roles: params.roles,
            gender: params.gender,
            ctime: nowFormat,
            utime: nowFormat
        };
        await this.model.CreateUser(user);
        return user;
    }

    async UpdateUser (_id:string, params: AuthSchema.UpdateUserParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const user = {...params};
        user.roles = params.roles;
        user.utime = nowFormat;
        await this.model.UpdateUser(_id,user);
        return user;
    }

    async DeleteUser (_id:string){
        const doc = await this.GetUser(_id);
        await this.model.DeleteUser(_id);
        return doc;
    }
}