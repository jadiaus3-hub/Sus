import { type Task, type InsertTask, type UpdateTask } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  getTaskStats(): Promise<{
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  }>;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const now = new Date();
    const task: Task = {
      ...insertTask,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: UpdateTask): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) {
      return undefined;
    }

    const updatedTask: Task = {
      ...existingTask,
      ...updates,
      updatedAt: new Date(),
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async getTaskStats(): Promise<{
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  }> {
    const tasks = Array.from(this.tasks.values());
    const now = new Date();
    
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.completed || task.status === "completed").length,
      inProgressTasks: tasks.filter(task => task.status === "in_progress").length,
      overdueTasks: tasks.filter(task => 
        task.dueDate && 
        new Date(task.dueDate) < now && 
        !task.completed && 
        task.status !== "completed"
      ).length,
    };
  }
}

export const storage = new MemStorage();
