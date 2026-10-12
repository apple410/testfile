

import mongoose, { Schema } from "mongoose";


export const taskschema = new mongoose.Schema({
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    ,
    title:{
        type:String,
    },
    description:{
        type:String
    }
},{
    timestamps:true
})


export const taskmodel = mongoose.models.Task || mongoose.model("Task",taskschema)
