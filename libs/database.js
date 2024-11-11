const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();


let cachedDb = null;

const databaseConnection = async ()=>{
    if(cachedDb){
        console.log("Use existing database");
        return Promise.resolve(cachedDb);
    }else{
       try {
        const connection = await MongoClient.connect(process.env.MONGO_URL, {
            native_parser: true
        });
        const client = connection.db("DATABASE_NAME");
        console.log("New Database created.");

        return cachedDb = client;
       } catch (error) {
        console.log(error);
       }
    }
};

export default databaseConnection;
