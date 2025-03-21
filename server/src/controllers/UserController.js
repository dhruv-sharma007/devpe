import UserService from "../services/UserService.js";
import ApiResponse from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/AsyncHandler.js";

class UserController {
	register = asyncHandler(async (req, res) => {
		const { fullName, userName, password } = req.body;

		const user = await UserService.register(fullName, userName, password);

        res
        .status(201).json(new ApiResponse(201, user, "User Created Successfully"))
	});
}

const userController =new UserController();

export default userController;
