import { ClipboardList, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatsCardsProps {
  stats?: {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const defaultStats = {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  };

  const data = stats || defaultStats;

  const cards = [
    {
      title: "Total Tasks",
      value: data.totalTasks,
      icon: ClipboardList,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      testId: "stat-total-tasks",
    },
    {
      title: "Completed",
      value: data.completedTasks,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      testId: "stat-completed-tasks",
    },
    {
      title: "In Progress",
      value: data.inProgressTasks,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
      testId: "stat-in-progress-tasks",
    },
    {
      title: "Overdue",
      value: data.overdueTasks,
      icon: AlertCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-500",
      testId: "stat-overdue-tasks",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900" data-testid={card.testId}>
                {card.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
