import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Task, InsertTask, UpdateTask } from "@shared/schema";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: InsertTask | UpdateTask) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
    assignee: task?.assignee || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title *
        </Label>
        <Input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title"
          data-testid="input-task-title"
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </Label>
        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter task description"
          data-testid="textarea-task-description"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </Label>
          <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
            <SelectTrigger data-testid="select-task-priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger data-testid="select-task-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          data-testid="input-task-due-date"
        />
      </div>
      
      <div>
        <Label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
          Assign To
        </Label>
        <Input
          id="assignee"
          type="text"
          value={formData.assignee}
          onChange={(e) => handleChange("assignee", e.target.value)}
          placeholder="Enter assignee name"
          data-testid="input-task-assignee"
        />
      </div>
      
      <div className="flex items-center justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          data-testid="button-cancel-task"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-submit-task"
        >
          {isLoading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
