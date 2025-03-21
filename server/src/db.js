import mongoose from "mongoose";
import { conf } from "./conf/conf.js";

const connectDb = async () => {
	try {
		const connectionInstance = await mongoose.connect(conf.dbUri);
        console.log("DATABASE :: MongoDB connected ")
	} catch (error) {
		console.log(500, "Database Service :: Error in connecting MonGo DB ", error);
	}
};

export default connectDb
