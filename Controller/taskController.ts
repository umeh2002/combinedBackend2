import express, { Request, Response } from "express";
import taskModel from "../Model/taskModel";
import authModel from "../Model/authModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { task, priority } = req.body;
    const user = await authModel.findById(userID);
    const create = await taskModel.create({
      name: user?.userName,
      priority,
      task,
      avatar: user?.avatar,
    });

    return res.status(201).json({
      message: "Task created successfully",
      data: create,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: "can't create task",
      data: error.message,
    });
  }
};

export const viewTask = async (req: Request, res: Response) => {
  try {
    const view = await taskModel.find();

    return res.status(200).json({
      message: "can see all task",
      data: view,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: "can't see all task",
      data: error.message,
    });
  }
};

export const viewOneTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const one = await taskModel.findById(id);

    return res.status(200).json({
      message: "can see one task",
      data: one,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: "can't see all task",
      data: error.message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, priority } = req.body;
    const tasked = await taskModel.findByIdAndUpdate(
      { id },
      { task, priority },
      { new: true }
    );

    return res.status(201).json({
      message: "Task updated successfully",
      data: tasked,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: "can't update task",
      data: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "task deleted successfully",
      data: tasked,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: "can't delete task",
      data: error.message,
    });
  }
};
