import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MOGO_URL;
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