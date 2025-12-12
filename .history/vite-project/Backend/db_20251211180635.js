// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const dbName = "VibeCulture"  
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = async () =>{
    try {
        await mongoose.connect(mongoURI, {
            // dbName: dbName,
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