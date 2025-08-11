import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedBy?: string;
}

export default function SimpleTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName] = useState(() => {
    const names = ['Guest'];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${names[0]}_${randomNum}`;
  });

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
    const interval = setInterval(loadTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTaskTitle.trim(),
          createdBy: userName
        })
      });
      
      if (response.ok) {
        setNewTaskTitle("");
        await loadTasks();
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          completed: !task.completed,
          completedBy: !task.completed ? userName : undefined
        })
      });
      
      if (response.ok) {
        await loadTasks();
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Public Task Manager</h1>
            <div className="flex items-center text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                {userName}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-green-600">Completed</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
              <div className="text-sm text-orange-600">Pending</div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              disabled={isLoading}
            />
            <button
              onClick={addTask}
              disabled={isLoading || !newTaskTitle.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '...' : '+'}
            </button>
          </div>

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No tasks yet. Add one above!
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`flex-1 ${
                      task.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.completed && task.completedBy && (
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      ✓ {task.completedBy}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}