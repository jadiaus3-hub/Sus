import { type Task, type InsertTask, type UpdateTask } from "@shared/schema";

class LocalStorage {
  private readonly TASKS_KEY = "tasks";

  constructor() {
    // Initialize with demo data if no tasks exist
    this.initializeDemo();
  }

  private initializeDemo() {
    const tasks = this.getTasks();
    if (tasks.length === 0) {
      // Create demo task on first load
      const demoTask: Task = {
        id: this.generateId(),
        title: "ทดสอบ Task แรก",
        description: "นี่คือ task ทดสอบเพื่อให้แน่ใจว่าระบบทำงานปกติ",
        priority: "medium",
        status: "todo",
        dueDate: null,
        assignee: null,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      localStorage.setItem(this.TASKS_KEY, JSON.stringify([demoTask]));
    }
  }

  private generateId(): string {
    // Generate a simple unique ID that works in all browsers
    return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 15);
  }

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
    const id = this.generateId();
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