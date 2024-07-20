import { Router } from "express";
import { FileUpload } from "../controller/file.js";
import { sendEmail } from "../controller/sendEmail.js";

const router = Router();

router.post('/',FileUpload)
router.post('/send',sendEmail)

export default router;