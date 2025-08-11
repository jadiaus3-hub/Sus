# Task Manager - CRUD Application

A simple task management application built with React, TypeScript, and Vite. The app uses localStorage for data persistence, making it perfect for deployment on static hosting platforms like Vercel.

## Features

- ✅ Create, read, update, and delete tasks
- 📊 Task statistics dashboard
- 🔍 Search and filter tasks
- 📅 Due date management
- 👤 Task assignment
- 📱 Responsive design
- 💾 Data persistence with localStorage

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build
```

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy your app
4. Your app will be available at: `https://your-app-name.vercel.app`

The app is configured with:
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Framework: `vite`

## Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and services
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── shared/                # Shared TypeScript schemas
├── dist/                  # Build output
└── vercel.json           # Vercel deployment configuration
```

## Usage

1. **Create Tasks**: Click the "New Task" button to create a new task
2. **Edit Tasks**: Click the edit icon to modify existing tasks
3. **Delete Tasks**: Click the trash icon to remove tasks
4. **Mark Complete**: Use the checkbox to mark tasks as completed
5. **Search**: Use the search bar to find specific tasks
6. **Filter**: Use the status filter to view tasks by status

## Data Storage

The application uses localStorage to store task data, which means:
- Data persists between browser sessions
- Data is stored locally on each user's device
- No server or database required
- Perfect for personal task management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request