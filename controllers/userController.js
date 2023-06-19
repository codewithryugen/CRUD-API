import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

export const createUser = async (req,res,next)=>{
    try{
        const {username,password} = req.body;
        const salt = await bcrypt.genSalt();
        const newpassword = await bcrypt.hash(password,salt);
        await User.create({username,password:newpassword});
        return res.status(201).json({message:'user is created !'});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        return res.status(201).json({message:'user is deleted !'});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}


export const updateUser = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const {username,password} = req.body;
        const salt = await bcrypt.genSalt();
        const newpassword = await bcrypt.hash(password,salt);
        await User.findByIdAndUpdate(id,{username,password:newpassword});
        return res.status(201).json({message:'user is updated !'});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}


export const loginUser = async (req,res,next) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const passOk = await bcrypt.compare(password,user.password);
        if(!passOk) return res.status(401).json({message:'wrong password !'});
        const secret = process.env.SECRET_KEY;
        jwt.sign({username,id:user._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token);
            return res.status(201).json({message:'ok'});
        });
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}