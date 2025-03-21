import UserService from "../services/UserService.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/AsyncHandler.js";

class UserController {
	register = asyncHandler(async (req, res) => {
		const { fullName, userName, password } = req.body;

		const user = await UserService.register(fullName, userName, password);

		if (!user) {
			throw new ApiError(
				500,
				"BACKEND :: USER CONTROLLER :: REGISTER :: SOMETHING WENT WRONG! "
			);
		}

		res.status(201).json(new ApiResponse(201, {}, "User Created Successfully"));
	});

	login = asyncHandler(async (req, res) => {
		const { userName, password } = req.body;

		const accessToken = await UserService.login(userName, password);

		if (!accessToken) {
			throw new ApiError(
				500,
				"BACKEND :: USER CONTROLLER :: REGISTER :: Didn't receive any accessToken in Controller"
			);
		}
		res
			.status(200)
			.cookie("accessToken", accessToken)
			.json(new ApiResponse(200, "User Logged in successfully"));
	});
}

const userController = new UserController();

export default userController;
