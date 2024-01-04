import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userModel = new Schema(
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
        contact : {
            type : Number,
            default : null
        },
        otp : {
            type : Number,
            default : null
        },
        role : {
            type : String,
            default : null
        },
        avatar:{
            type: String,
            default:null,
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

export default mongoose.model("users", userModel);