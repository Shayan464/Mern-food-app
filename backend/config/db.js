import mongoose from "mongoose";


export const connectDB = async () => {
   try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    if(conn){
        return console.log("MongoDb connection successful", mongoose.connection.host)
    }
   } catch (error) {
     console.log("MongoDb connection Error", error)
   }
}