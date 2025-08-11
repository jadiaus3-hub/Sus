import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedBy?: string;
}

const API_BASE = '';

export default function SimpleTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [userName] = useState(() => {
    const names = ['Visitor'];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${names[0]}_${randomNum}`;
  });

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString();
  };

  // Load tasks from localStorage
  const loadTasks = () => {
    try {
      const stored = localStorage.getItem('simple-tasks');
      if (stored) {
        const parsedTasks = JSON.parse(stored);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Save tasks to localStorage
  const saveTasks = (newTasks: Task[]) => {
    try {
      localStorage.setItem('simple-tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: generateId(),
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedBy: undefined
    };

    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
    setNewTaskTitle("");
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedBy: !task.completed ? userName : undefined
          }
        : task
    );
    saveTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <h1 className="text-xl font-semibold text-center mb-4" data-testid="text-title">
          Public Task Manager
        </h1>
        
        {/* User indicator */}
        <p className="text-sm text-gray-600 text-center mb-6" data-testid="text-user">
          You: {userName}
        </p>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add Task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="input-new-task"
            />
            <Button 
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              data-testid="button-add-task"
            >
              Add
            </Button>
          </div>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-total-count">{totalTasks}</div>
            <div className="text-sm text-gray-600" data-testid="text-total-label">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-completed-count">{completedTasks}</div>
            <div className="text-sm text-gray-600" data-testid="text-completed-label">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-pending-count">{pendingTasks}</div>
            <div className="text-sm text-gray-600" data-testid="text-pending-label">Pending</div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8" data-testid="text-no-tasks">
              No tasks yet. Add your first task above!
            </p>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`flex items-center gap-3 p-3 border rounded ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                }`}
                data-testid={`task-item-${task.id}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  data-testid={`checkbox-task-${task.id}`}
                />
                <span 
                  className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                  data-testid={`text-task-title-${task.id}`}
                >
                  {task.title}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}