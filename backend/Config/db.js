import mongoose from "mongoose";
const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDb_URI);
    console.log(`Connected to Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in MongoDb conection ${error}`);
  }
};

export default ConnectDb;
