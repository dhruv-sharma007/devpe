import { Payment } from "../models/Payment.js";
import { User } from "../models/UserModel.js";
import ApiError from "../utility/ApiError.js";
import { setCache, getCache } from "../redis/caching.js";

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
		console.log(userName, password)
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
	getUser = async (id) => {
		if (!id) {
			throw new ApiError(400, "Backend :: APIERROR :: Id is required");
		}
		const key = `user:${id}`;
		const user = await getCache(key);
		if (!user) {
			const user = await User.findById(id).select(" -password");
			setCache(`user:${key}`, user);
			return user;
		}

		if (!user) {
			throw new ApiError(404, "Backend :: APIERROR :: User not found!");
		}

		return JSON.parse(user);
	};

	sendMoney = async (sender, receiver, amount) => {
		if (!sender || !receiver || !amount) {
			throw new ApiError(400, "Backend :: APIERROR :: Both id are required");
		}

		const senderAccount = User.findByIdAndUpdate(
			sender,
			{ $inc: { balance: -amount } },
			{ new: true }
		).select(" -password");

		const payment = await Payment.create({
			sender,
			receiver,
			amount,
		});

		if (!payment) {
			throw ApiError(500, "Backend :: APIERROR :: Error in creating payment");
		}

		return payment;
	};
	findByUserName = async (userName) => {
		if (!userName) {
			throw ApiError(400, "Backend :: APIERROR :: UserName is required");
		}

		const key = `user:${userName}`;
		const findUser =await getCache(key);
		if (!findUser) {
			const findUser = await User.findOne({ userName }).select(
				" -password -balance"
			);
			if (!findUser) {
				throw ApiError(404, "Backend :: APIERROR :: User not found");
			}
			await setCache(key, findUser)
		}


		return findUser;
	};
	getCurrentUser = async (userName) => {
		if(!userName){
			throw ApiError(400, "Backend :: APIERROR :: Username is required")
		}
	};
}

const userService = new UserService();

export default userService;
