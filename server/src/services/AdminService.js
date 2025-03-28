import { conf } from "../conf/conf.js";
import { AdminEntry } from "../models/AdminEntry.js";
import { User } from "../models/UserModel.js";
import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";

class AdminService {
	#options = {
		httpOnly: true,
		secure: false,
		sameSite: "strict",
		signed: true,
		maxAge: 24 * 60 * 60 * 1000,
	};

	async login(id, password, name, username) {
		if (!id || !password || !name || !username) {
			throw new ApiError(400, "Both field is required");
		}
		if ([id, password, name, username].some((field) => field.trim() === "")) {
			throw new ApiError(400, "Both field is required");
		}
		if (id !== conf.adminId) {
			throw new ApiError(400, "Id not found");
		}
		if (password !== conf.adminPassword) {
			throw new ApiError(400, "password did not match");
		}

		const payload = {
			adminId: conf.adminId,
			name,
			username,
		};

		await AdminEntry.create({
			username,
			name,
		});

		const accessToken = await jwt.sign(payload, conf.adminAccessToken);

		return accessToken;
	}
	async getUsers(currentPage, numOfUsersPerPage) {
		const user = await User.aggregate([
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$skip: (currentPage - 1) * numOfUsersPerPage,
			},
			{
				$limit: numOfUsersPerPage,
			},
			{
				$project: {
					password: 0,
				},
			},
		]);
		return user;
	}
	async getUserByUername(username) {
		const user = await User.aggregate([
			{
				$match: {
					userName: username,
				},
			},
			{
				$project: {
					password: 0,
				},
			},
		]);
	}
	async deleteUser(userName) {
		if (!userName || userName === "") {
			throw new ApiError(400, "username is required");
		}

		try {
			await User.findOneAndDelete({ userName });
			return true;
		} catch (error) {
			return false;
		}
	}
	async sendMoneyToUser(userName, money = 10) {
		if (!userName || userName === "") {
			throw new ApiError(400, "username is required");
		}

		let user = await User.findOneAndUpdate(
			{ userName },
			{ $inc: { balance: money } }
		);

		if (user) {
			throw new ApiError("User not found");
		}

		return true;
	}
	async addMoneyToAllUser(money) {
		if (!money || money === "") {
			throw new ApiError(400, "Atleast some money needed");
		}

		try {
			await User.updateMany({}, { $inc: { balance: money } });
			return true;
		} catch (error) {
			throw new ApiError(500, error.message)
			return false;
		}
	
	}
	
}

const adminService = new AdminService();

export default adminService;
