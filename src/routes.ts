import express from "express";
import reportController from "./controllers/reportController";

const router = express.Router();

router.post("/report/:postId", reportController.report);
router.post("/resolve/:reportId", reportController.resolve);

export = router;
