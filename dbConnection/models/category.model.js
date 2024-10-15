
import mongoose, { Types } from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minLength:[2,'too short category name']
    },slug:{
        type:String,
        unique:[true,'slug is required'],
        lowercase:true,
        required:true
    },image:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{timestamps:true,versionKey:false})

schema.post('init',function(doc){
    if(doc.image) doc.image = process.env.BASE_URL +'categories/'+doc.image
  
})


export const Category = mongoose.model('Category',schema) 