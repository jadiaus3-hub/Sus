import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, RefreshCw, Users } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedBy?: string;
}

const API_BASE = '';  // Use relative URLs for both dev and production

// Debug API connection
console.log('API Base:', API_BASE || 'same origin');

export default function SimpleTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName] = useState(() => {
    // Generate simple user name for tracking who did what
    const names = ['User', 'Guest', 'Visitor', 'Team Member'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomName}_${randomNum}`;
  });

  // Load tasks from server
  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/tasks`);
      if (response.ok) {
        const data = await response.json();
        console.log('Tasks loaded:', data);
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh every 5 seconds to see others' updates
  useEffect(() => {
    loadTasks();
    const interval = setInterval(loadTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTaskTitle.trim(),
          createdBy: userName
        })
      });
      
      if (response.ok) {
        setNewTaskTitle("");
        await loadTasks(); // Refresh to see the new task
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await loadTasks(); // Refresh to see the changes
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          completed: !task.completed,
          completedBy: !task.completed ? userName : undefined
        })
      });
      
      if (response.ok) {
        await loadTasks(); // Refresh to see the changes
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                Public Task Manager
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>You: {userName}</span>
                {isLoading && <span className="text-blue-500">(Syncing...)</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadTasks}
                  disabled={isLoading}
                  data-testid="button-refresh"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Add Task Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1"
                data-testid="input-new-task"
              />
              <Button 
                type="submit"
                data-testid="button-add-task"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </form>

            {/* Task Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <div className="text-sm text-blue-600">Total</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-green-600">Completed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {tasks.filter(t => !t.completed).length}
                </div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No tasks yet. Add your first task above!
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border"
                    data-testid={`task-${task.id}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 text-blue-600"
                      data-testid={`checkbox-${task.id}`}
                    />
                    <span
                      className={`flex-1 ${
                        task.completed 
                          ? "line-through text-gray-500" 
                          : "text-gray-900"
                      }`}
                      data-testid={`title-${task.id}`}
                    >
                      {task.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      data-testid={`delete-${task.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}