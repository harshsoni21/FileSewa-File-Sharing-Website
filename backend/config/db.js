import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url = "mongodb+srv://harshsoni9119:Aman123@cluster0.zwvvonn.mongodb.net/FileSewa";
const  connectDB = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB', error);
      });
}

export {
    connectDB
}