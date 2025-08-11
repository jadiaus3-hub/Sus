import { Bell, User, CheckSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
