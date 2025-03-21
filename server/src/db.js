import mongoose from "mongoose";

const connectDb = async () =>{
    const connectionInstance = await mongoose.connect()
}