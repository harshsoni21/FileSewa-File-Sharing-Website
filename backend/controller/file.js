import multer from "multer";
import path from "path";
import FileModel from "../model/file.js";
import { v4 as uuid } from 'uuid';

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 }, // 100 MB limit
}).single('myfile');

const FileUpload = async (req, res) => {
    try {
        // Store file 
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        // Validate Request
        if (!req.file) {
            return res.status(400).json({
                message: "Upload File Please"
            });
        }

        // Store file in database -> myfile name at frontend 
        const file = new FileModel({
            filename: req.file.filename, // Corrected field name
            path: req.file.path,
            uuid: uuid(),
            size: req.file.size
        });

        const response = await file.save();
        return res.json({ file: `http://localhost:3000/files/${response.uuid}` });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
};

export {
    FileUpload
};
