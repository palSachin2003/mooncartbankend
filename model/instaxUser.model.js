import mongoose from "mongoose";

const Schema = mongoose.Schema;

const instaxUserModel = new Schema(
    {
        fullName : {
            type : String,
            requird : true
        },
        userName:{
            type : String,
            default: null
        },
        email : {
            type : String,
            requird : true
        },
        password : {
            type : String,
            requird : true
        },
      
        status : {
            type : Number,
            default : 1
        },
        createAt : {
            type : Date,
            default : Date.now()
        }
    }
);

export default mongoose.model("instaxUsers", instaxUserModel);