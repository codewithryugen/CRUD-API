import jwt from 'jsonwebtoken';

const userMiddleware = (req,res,next) =>{
    try{
        const {token} = req.cookies;
        jwt.verify(token,process.env.SECRET_KEY,{},(err,info)=>{
            if(err) return res.status(401).json({message:'kamu hamker ya?'});
            return next();
        });
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}

export default userMiddleware;