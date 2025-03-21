import app from "./app.js";
import { conf } from "./conf/conf.js";
import connectDb from "./db.js";
import { connectToRedis } from "./redis/client.js";

const port = conf.port;

(async () => {
	try {
		await connectDb();

		await connectToRedis();

		app.listen(port, () => {
			console.log("BACKEND :: RUNNING :: PORT ::", port);
		});
	} catch (error) {
		console.log("BACKEND :: ERROR SERVER MODULE :: ", error);
	}
})();
