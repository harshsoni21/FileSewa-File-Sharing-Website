// this file is making for cronjob after 24 hour expire link schedular

import { connectDB } from "./config/db.js";
import FileModel from "./model/file.js"
import fs from "fs"

connectDB();

const deleteFile = async () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const files = await FileModel.find({
        createdAt: { $lt: pastDate }
    })

    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log("done")
            } catch (error) {
                console.log("error while deleting file",error);
            }
        }
        console.log("job done")
    }
    console.log("No file need to expire")
 
}

deleteFile().then(process.exit);