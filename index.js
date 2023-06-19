import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import user from './routes/users.js';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,`${Date.now()}${path.extname(file.originalname)}`);
    },
})

const upload = multer({limits: { fileSize: 10 * 1024 * 1024 },storage});
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(user);

app.post('/upload',upload.single("file"),(req,res,next)=>{
    try{
        return res.status(201).json({message:'file uploaded!'});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
});

app.get('/',(req,res,next)=>{
    return res.status(200).json({message:'ok'});
});

app.listen(process.env.APP_PORT,async () => {
    console.log(`app run in port ${process.env.APP_PORT}`);
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log('db connected!');
    }catch(err){
        console.log(err);
    }
});