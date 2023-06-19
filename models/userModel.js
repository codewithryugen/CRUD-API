import mongoose  from "mongoose";

const {Schema} = mongoose;

const User = new Schema({
    username:{
        type:String,
        min:2,
        required:true,
    },
    password:{
        type:String,
        min:4,
        required:true,
    }
},{timestamps:true});

export default mongoose.model('user',User);