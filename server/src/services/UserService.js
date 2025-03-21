import { User } from "../models/UserModel.js";
import ApiError from "../utility/ApiError.js";

class UserService {
	register = async (fullName, userName, password) => {
		if (!userName || !fullName || !password) {
			throw new ApiError(400, "Backend :: APIERROR :: All fields are required");
		}

		if ([userName, fullName, password].some((field) => field?.trim() === "")) {
			throw new ApiError(400, "Backend :: APIERROR :: All fields are required");
		}

		const findUser = await User.findOne({ userName });

		if (findUser) {
			throw new ApiError(400, "Backend :: APIERROR :: User already exist!");
		}

		const user = await User.create({
			fullName,
			userName,
			password,
		});

		if (!user) {
			throw new ApiError(
				500,
				"Backend :: APIERROR :: Error in registering user"
			);
		}

		return { user };
	};
	login = async (userName, password) => {
		if (!userName || !password) {
			throw new ApiError(
				400,
				"Backend :: APIERROR :: All fields are required!"
			);
		}
		if ([userName, password].some((field) => field?.trim() === "")) {
			throw new ApiError(
				400,
				"Backend :: APIERROR :: All fields are required!"
			);
		}
		const user = await User.findOne({ userName });

		if (!user) {
			throw new ApiError(404, "Backend :: APIERROR :: User not found");
		}

		const isPasswordCorrect = await user.isPasswordCorrect(password);

		if (!isPasswordCorrect) {
			throw new ApiError(400, "Backend :: APIERROR :: Password did not match");
		}

		const accessToken = await user.generateAccessToken();

		if (!accessToken) {
			throw new ApiError(
				404,
				"Backend :: APIERROR :: Error in generating access token"
			);
		}
		return accessToken;
	};
}

const userService = new UserService();

export default userService;
