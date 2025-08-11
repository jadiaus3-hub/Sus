import { z } from "zod";

// Task schema for frontend-only application
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["todo", "in_progress", "completed"]),
  dueDate: z.date().nullable(),
  assignee: z.string().nullable(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  status: z.enum(["todo", "in_progress", "completed"]).default("todo"),
  dueDate: z.date().nullable().optional(),
  assignee: z.string().optional(),
});

export const updateTaskSchema = insertTaskSchema.partial().extend({
  completed: z.boolean().optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
