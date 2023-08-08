import express, { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  viewOneTask,
  viewTask,
} from "../Controller/taskController";

const router = Router();

router.route("/:userId/create-task").post(createTask);
router.route("/view-all-task").get(viewTask);
router.route("/:id/view-one-task").get(viewOneTask);
router.route("/:id/update-task").patch(updateTask);
router.route("/:id/delete-task").delete(deleteTask);

export default router;
