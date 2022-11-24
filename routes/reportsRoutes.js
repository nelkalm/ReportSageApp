import express from "express";
const router = express.Router();

import {
  createReport,
  deleteReport,
  getAllReports,
  updateReport,
  showStats,
} from "../controllers/reportsController.js";

router.route("/").post(createReport).get(getAllReports);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteReport).patch(updateReport);

export default router;
