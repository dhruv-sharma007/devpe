import { User } from "../models/UserModel.js";
import ApiError from "../utility/ApiError.js";

class UserService {
	register = async (fullName, userName, password) => {

        if (!userName || !fullName || !password) {
            throw new ApiError(400, "All fields are required");
        }

		if ([userName, fullName, password].some((field) => field?.trim() === "")) {
			throw new ApiError(400, "All fields are required");
		}


        const user = await User.create({
            fullName,
            userName,
            password
         }).select(" -password ")

         if(!user){
            throw new ApiError(500, "Error in registering user")
         }

         return { user }
	};
}

const userService = new UserService();

export default userService;