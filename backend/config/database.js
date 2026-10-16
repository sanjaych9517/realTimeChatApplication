//  connect database in our system
import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Mongodb connected successfullyy")
    }).catch((err) => {
        console.log(err)
    })
}

export default connectDB;