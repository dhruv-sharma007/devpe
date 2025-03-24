import AdminService from "../services/AdminService.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse";
import { asyncHandler } from "../utility/AsyncHandler.js";

class AdminController {
	login = asyncHandler(async (req, res) => {
		const { id, password, name, username } = req.body;
		const adminToken = await AdminService.login(id, password, name, username);
		if (!adminToken) {
			console.log("Accesstoken didn't receie");
		}

		res
			.status(200)
			.cookie("adminToken", adminToken)
			.json(new ApiResponse(200, {}, "Admin Logged in successfully"));
	});
	logout = (req, res) => {
		res
			.clearCookie("adminToken", {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				signed: true,
			})
			.json(new ApiResponse(200, "Admin loggedOut successfully"));
	};
}
