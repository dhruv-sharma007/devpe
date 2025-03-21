import Redis from "ioredis";
import { conf } from "../conf/conf.js";
import { asyncHandler } from "../utility/AsyncHandler.js";

export const client = new Redis({
	host: conf.redisHost,
	port: conf.redisPort,
    lazyConnect: true,
});

export const connectToRedis = asyncHandler(async () => {
    const connctionInstance = await client.connect()
    console.log("DATABASE :: REDIS CONNECTED ")
    return connctionInstance
});
