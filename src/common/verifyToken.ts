import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = async(req:any, res:any, next:any) =>{
    const header = req.header('Authorization');
    const token = header && header.split(' ')[1];
    if(!token){
        return res.json({status: 403, message:"Accesstoken not found"});
    }

    try {
        const decoded = jwt.verify(token, typeof process.env.ACCESSTOKEN) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
     res.json({status:500, message:"Token invalid"});
    }
    
}