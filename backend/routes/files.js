import { Router } from "express";
import { FileUpload } from "../controller/file.js";

const router = Router();

router.post('/',FileUpload)

export default router;