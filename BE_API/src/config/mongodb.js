


import {MongoClient, ServerApiVersion} from 'mongodb'
import { env } from "~/config/environment";

let nodeDatabaseInstance = null

const mongoClinetInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    try {
        await mongoClinetInstance.connect();
        nodeDatabaseInstance = mongoClinetInstance.db(env.DATABASE_NAME);
        console.log("Kết nối thành công!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw new Error("Lỗi mạng!!!!!!!!!!!!!!!!!!");
    }
}

export const CLOSE_DB = async () => {
    await mongoClinetInstance.close()
}

export const GET_DB = () => {
    if(!nodeDatabaseInstance){
        throw new Error('Hay ket noi den CSDl')
    } else {
        return nodeDatabaseInstance
    }
}

