import { Router } from "express";
import { showFile } from "../controller/show.js";


const router = Router();

router.get('/:uuid',showFile)

export default router;