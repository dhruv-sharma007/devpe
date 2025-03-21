import ApiResponse from "./ApiResponse.js";

const errorHandler = async (err, req, res, next) => {
	console.error(err.stack);
	res
		.status(err.code || 500)
		.json(new ApiResponse(err.code || 500, {}, { message: err.message }));
};

export { errorHandler };
