import { type Task, type InsertTask, type UpdateTask } from "@shared/schema";

class LocalStorage {
  private readonly TASKS_KEY = "tasks";

  private getTasks(): Task[] {
    try {
      const tasks = localStorage.getItem(this.TASKS_KEY);
      if (!tasks) return [];
      
      return JSON.parse(tasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      }));
    } catch {
      return [];
    }
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  async getAllTasks(): Promise<Task[]> {
    return this.getTasks().sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.getTasks().find(task => task.id === id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const tasks = this.getTasks();
    const id = crypto.randomUUID();
    const now = new Date();
    
    const task: Task = {
      id,
      title: insertTask.title,
      description: insertTask.description || null,
      priority: insertTask.priority || "medium",
      status: insertTask.status || "todo",
      dueDate: insertTask.dueDate || null,
      assignee: insertTask.assignee || null,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  }

  async updateTask(id: string, updates: UpdateTask): Promise<Task | undefined> {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return undefined;
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };

    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      return false;
    }

    this.saveTasks(filteredTasks);
    return true;
  }

  async getTaskStats(): Promise<{
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  }> {
    const tasks = this.getTasks();
    const now = new Date();
    
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.completed || task.status === "completed").length,
      inProgressTasks: tasks.filter(task => task.status === "in_progress").length,
      overdueTasks: tasks.filter(task => 
        task.dueDate && 
        task.dueDate < now && 
        !task.completed && 
        task.status !== "completed"
      ).length,
    };
  }
}

export const localStorageService = new LocalStorage();