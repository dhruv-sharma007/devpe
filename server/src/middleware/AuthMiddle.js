import { conf } from "../conf/conf";
import ApiError from "../utility/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utility/AsyncHandler";

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

		next();
	});
}

const auth = new Auth();

export default auth;
