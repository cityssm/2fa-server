import { Router } from "express";
import handler_manage from "../handlers/manage.js";
import handler_doEnable from "../handlers/doEnable.js";
import handler_doReset from "../handlers/doReset.js";
export const router = Router();
router.get("/", handler_manage);
router.post("/doEnable", handler_doEnable);
router.post("/doReset", handler_doReset);
export default router;
