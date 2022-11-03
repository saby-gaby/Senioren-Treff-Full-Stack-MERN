import "dotenv/config";
import mongoose from "mongoose";

async function connectMongoose() {
  const _pwd = process.env.MONGO_DB_PW;
  const _user = process.env.MONGO_DB_USER;
  const _cluster = process.env.MONGO_DB_CLUSTER;
  const _database = process.env.MONGO_DB_DATABASE;
  const _uri = `mongodb+srv://${_user}:${_pwd}@${_cluster}/${_database}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(_uri);
    const collections = (
      await mongoose.connection.db.listCollections().toArray()
    ).map((el) => el.name);
    console.log(`collections of '${_database}' db`, collections);
    return true;
  } catch (error) {
    console.error("Could not connect to mongoose", error);
    return false;
  }
}

export default connectMongoose;
