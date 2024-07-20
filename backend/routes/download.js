import { Router } from "express";
import { downloadContent } from "../controller/downloadContent.js";
const router = Router();

router.get('/:uuid',downloadContent);

export default router;