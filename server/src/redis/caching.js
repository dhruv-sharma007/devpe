import { client } from "./client.js";

const setCache = async (key, data, expire = 60 * 1) => {
	try {
        return await client.set(key, data)
	} catch (error) {
        throw error
    }
};

const getCache = async (key)=>{
    try {
        return await client.getCache(key)        
    } catch (error) {
        throw error
    }
}

export{
    setCache,
    getCache,
}