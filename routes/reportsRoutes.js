import express from "express";
const router = express.Router();

import {
  createReport,
  deleteReport,
  getAllReports,
  updateReport,
  showStats,
} from "../controllers/reportsController.js";

import testUser from "../middleware/testUser.js";

router.route("/").post(testUser, createReport).get(getAllReports);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .delete(testUser, deleteReport)
  .patch(testUser, updateReport);

export default router;
