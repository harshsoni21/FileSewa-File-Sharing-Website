import mongoose from "mongoose";
import dotenv from 'dotenv';
import { MONGO_URL } from "../private/doc";

dotenv.config();

const url = MONGO_URL;
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