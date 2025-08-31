// const mongoose = require('mongoose');
import mongoose from "mongoose";

// const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
// const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";

const connectToMongo = async () =>{
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    // mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    // }) 
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
}
}
export default connectToMongo;