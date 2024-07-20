import path from 'path';
import { fileURLToPath } from 'url';
import FileModel from "../model/file.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadContent = async (req, res) => {
    try {
        const file = await FileModel.findOne({
            uuid: req.params.uuid
        });

        if (!file) {
            return res.render('download', { error: "Link has been expired" });
        }

        const filePath = path.join(__dirname, '..', file.path);
        res.download(filePath);
    } catch (error) {
        res.render('download', { error: "Something went wrong" });
    }
};

export {
    downloadContent
};
