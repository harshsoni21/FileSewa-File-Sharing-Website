import { connectDB } from "./config/db.js";
import FileModel from "./model/file.js";
import fs from "fs";
import { CronJob } from 'cron';

connectDB();

const deleteFile = async () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const files = await FileModel.find({
        createdAt: { $lt: pastDate }
    });

    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log("File deleted successfully");
            } catch (error) {
                console.log("Error while deleting file:", error);
            }
        }
        console.log("Job done");
    } else {
        console.log("No files need to expire");
    }
};

// Create a cron job to run deleteFile every 24 hours
const job = new CronJob('0 0 * * *', deleteFile, null, true, 'America/Los_Angeles');

// Start the cron job
job.start();
