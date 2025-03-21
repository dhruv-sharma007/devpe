import dotenv from "dotenv/config"

export const conf = {
    accessToken: process.env.ACCESS_TOKEN,
    port: process.env.PORT,
    dbUri: process.env.MONGO_DB_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    cookieSecret: process.env.COOKIE_PARSER_SECRET
}