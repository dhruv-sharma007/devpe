import { conf } from "../conf/conf";
import ApiError from "../utility/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utility/AsyncHandler";
import { User } from "../models/UserModel";
import { getCache, setCache } from "../redis/caching";

class Auth {
	verifyAccessToken = asyncHandler(async (req, res, next) => {
		const cookie = req.cookie.accessToken;
		if (!cookie) {
			throw new ApiError(400, "You are not authenticated");
		}

		const verifyToken = jwt.verify(cookie, conf.accessToken);

		if (!verifyToken) {
			throw new ApiError(400, "Error in verifying jwt secret");
		}

		const key = `user:${verifyToken._id}`;

		const userCache = await getCache(key);

		if (!userCache) {
			const user = await User.findById(verifyToken?._id);
			await setCache(JSON.stringify(key, user), 60 * 60);
			req.user = user;
			next();
		}

		req.user = JSON.parse(userCache);

		next();
	});
}

const auth = new Auth();

export default auth;
