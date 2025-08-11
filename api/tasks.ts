// Vercel Function types
interface VercelRequest {
  method?: string;
  body?: any;
  query?: { [key: string]: string | string[] };
  headers?: { [key: string]: string };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(object: any): void;
  end(): void;
  setHeader(name: string, value: string): void;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedBy?: string;
}

// In-memory storage for demo (in production, use a database)
let tasks: Task[] = [
  {
    id: "1",
    title: "สวัสดี! นี่คือ Public Task Manager",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2", 
    title: "ทุกคนสามารถเพิ่ม แก้ไข และลบ tasks ได้",
    completed: true,
    createdAt: new Date().toISOString(),
    completedBy: "System"
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(tasks);

      case 'POST':
        const { title, createdBy } = req.body;
        if (!title || typeof title !== 'string') {
          return res.status(400).json({ message: "Title is required" });
        }
        
        const newTask: Task = {
          id: Date.now().toString(),
          title: title.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        };
        
        tasks.push(newTask);
        return res.status(201).json(newTask);

      case 'PATCH':
        const taskId = req.query?.id as string;
        if (!taskId) {
          return res.status(400).json({ message: "Task ID is required" });
        }

        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
          return res.status(404).json({ message: "Task not found" });
        }

        const updates = req.body;
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        return res.status(200).json(tasks[taskIndex]);

      case 'DELETE':
        const deleteId = req.query?.id as string;
        if (!deleteId) {
          return res.status(400).json({ message: "Task ID is required" });
        }

        const originalLength = tasks.length;
        tasks = tasks.filter(task => task.id !== deleteId);
        
        if (tasks.length === originalLength) {
          return res.status(404).json({ message: "Task not found" });
        }
        
        return res.status(204).end();

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}