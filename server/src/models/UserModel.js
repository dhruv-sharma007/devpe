import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { conf } from "../conf/conf.js";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
    },
    userName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enums:["User", "Admin"],
        default: "User",
    },
    balance: {
        type: Number,
        default: 5000, 
    }

},{ timestamps: true })

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) next();
    this.password =await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    const payload = {
        userName: this.userName,
        fullName: this.fullName,
        role: this.role,
    }
    return await jwt.sign(payload, conf.accessToken)
}

const User = mongoose.model("User", userSchema)

export { User }
