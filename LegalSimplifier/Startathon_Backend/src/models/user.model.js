import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
{
    fullName : {
        type : String, 
        required : true, 
        trim : true,
        index : true
    },

    email : {
        type : String, 
        required : true, 
        unique : true,
        lowercase : true,
        trim : true,
    },

    role: { 
        type: String, 
        enum: ["patient", "doctor", "admin"], 
        default: "patient" 
    },

    password : {
        type : String, 
        required : [true , "Password is required"]
    },

    refreshToken : {
        type : String, 
    },

},{timestamps : true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
   return jwt.sign({
        _id : this._id,
        email : this.email,
        fullName : this.fullName
    },
       process.env.ACCESS_TOKEN_SECRET,
       {
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
       }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id : this._id,
    },
       process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn : process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}

export const User = mongoose.model("User" , userSchema)