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

interface SimpleTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedBy?: string;
  createdBy?: string;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, Task>;
  private simpleTasks: Map<string, SimpleTask>;

  constructor() {
    this.tasks = new Map();
    this.simpleTasks = new Map();
    
    // Add some demo simple tasks
    this.initializeSimpleTasks();
  }
  
  private initializeSimpleTasks() {
    const demoTasks = [
      {
        id: '1',
        title: 'สวัสดี! นี่คือ Public Task Manager',
        completed: false,
        createdAt: new Date().toISOString(),
        createdBy: 'System'
      },
      {
        id: '2',
        title: 'ทุกคนสามารถเพิ่ม แก้ไข และลบ tasks ได้',
        completed: false,
        createdAt: new Date().toISOString(),
        createdBy: 'System'
      }
    ];
    
    demoTasks.forEach(task => this.simpleTasks.set(task.id, task));
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
      id,
      title: insertTask.title,
      description: insertTask.description ?? null,
      priority: insertTask.priority ?? "medium",
      status: insertTask.status ?? "todo",
      dueDate: insertTask.dueDate ?? null,
      assignee: insertTask.assignee ?? null,
      completed: false,
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

  // Simple task methods for public server
  async getSimpleTasks(): Promise<SimpleTask[]> {
    return Array.from(this.simpleTasks.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createSimpleTask(task: { title: string; createdBy?: string }): Promise<SimpleTask> {
    const id = Date.now().toString();
    const newTask: SimpleTask = {
      id,
      title: task.title,
      completed: false,
      createdAt: new Date().toISOString(),
      createdBy: task.createdBy,
    };
    this.simpleTasks.set(id, newTask);
    return newTask;
  }

  async updateSimpleTask(id: string, updates: Partial<SimpleTask>): Promise<SimpleTask> {
    const existingTask = this.simpleTasks.get(id);
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask: SimpleTask = {
      ...existingTask,
      ...updates,
    };
    this.simpleTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteSimpleTask(id: string): Promise<boolean> {
    return this.simpleTasks.delete(id);
  }
}

export const storage = new MemStorage();
