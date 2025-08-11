import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@shared/schema";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskList({ tasks, loading, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string, completed: boolean) => {
    if (completed || status === "completed") {
      return "bg-green-100 text-green-800";
    }
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "todo":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate: Date | string | null, completed: boolean, status: string) => {
    if (!dueDate || completed || status === "completed") return false;
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Loading tasks...</h3>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-500" data-testid="text-no-tasks">No tasks found. Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {tasks.map((task) => {
          const isTaskCompleted = task.completed || task.status === "completed";
          const taskOverdue = isOverdue(task.dueDate, task.completed, task.status);
          
          return (
            <div
              key={task.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              data-testid={`task-item-${task.id}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={isTaskCompleted}
                    onCheckedChange={() => onToggleComplete(task)}
                    data-testid={`checkbox-task-${task.id}`}
                  />
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-medium ${
                        isTaskCompleted ? "line-through text-gray-500" : "text-gray-900"
                      }`}
                      data-testid={`text-task-title-${task.id}`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p
                        className={`text-sm ${
                          isTaskCompleted ? "line-through text-gray-400" : "text-gray-500"
                        }`}
                        data-testid={`text-task-description-${task.id}`}
                      >
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center mt-2 space-x-4">
                      <Badge
                        className={getPriorityBadgeColor(task.priority)}
                        data-testid={`badge-priority-${task.id}`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </Badge>
                      <Badge
                        className={getStatusBadgeColor(task.status, task.completed)}
                        data-testid={`badge-status-${task.id}`}
                      >
                        {isTaskCompleted ? "Completed" : task.status.replace("_", " ")}
                      </Badge>
                      {task.dueDate && (
                        <span
                          className={`text-xs ${
                            taskOverdue ? "text-red-500" : "text-gray-500"
                          }`}
                          data-testid={`text-due-date-${task.id}`}
                        >
                          {taskOverdue ? "Overdue: " : "Due: "}{formatDate(task.dueDate)}
                        </span>
                      )}
                      {task.assignee && (
                        <span className="text-xs text-gray-500" data-testid={`text-assignee-${task.id}`}>
                          Assigned to: {task.assignee}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(task)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    data-testid={`button-edit-${task.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50"
                    data-testid={`button-delete-${task.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500" data-testid="text-task-count">
          Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
