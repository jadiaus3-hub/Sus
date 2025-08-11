# Task Manager - CRUD Application

## Overview

A frontend-only task management application built with React, TypeScript, and Vite. The application provides a comprehensive dashboard for managing tasks with CRUD operations, filtering capabilities, and statistics. Users can create, edit, delete, and track tasks with different priorities and statuses, including due date management and assignee tracking. Data is persisted using localStorage, making it perfect for deployment on static hosting platforms like Vercel.

## Recent Changes (August 11, 2025)

- ✅ Successfully migrated project from Replit Agent to standard Replit environment
- ✅ Updated UI to match reference design from su2-xi.vercel.app
- ✅ Simplified Public Task Manager interface with clean design
- ✅ Implemented real-time task synchronization with server backend
- ✅ Added user identification system (Guest_XXX format)
- ✅ Created responsive layout optimized for mobile and desktop
- ✅ Verified all dependencies and server configuration
- ✅ Ensured proper client/server separation and security practices
- ✅ Converted to full-stack Vercel deployment with serverless functions
- ✅ Created /api/tasks.ts for Vercel Functions backend
- ✅ Updated frontend to use API calls instead of localStorage
- ✅ Configured vercel.json for full-stack deployment
- ✅ Fixed Vercel deployment configuration (builds vs functions conflict)
- ✅ Created proper Tailwind CSS setup for client build
- ✅ Added all necessary client dependencies and config files
- ✅ Simplified frontend to vanilla React + Tailwind CSS only
- ✅ Fixed 404 deployment issues by moving dist files to root
- ✅ Configured Vercel functions for API backend
- ✅ Successfully deployed to Vercel at https://i8i77.vercel.app/
- ✅ Full-stack Public Task Manager with working API endpoints

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client uses React with TypeScript and implements a modern component-based architecture:

- **UI Framework**: Vite-powered React application with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod schema validation
- **Component Library**: Radix UI primitives with custom styling via class-variance-authority

The frontend follows a clean separation with dedicated folders for components, pages, hooks, and utilities. The architecture emphasizes reusable UI components and type-safe data handling.

### Storage Architecture

Frontend localStorage-based data persistence:

- **Storage Service**: LocalStorage class implementing CRUD operations
- **Data Structure**: Task objects with comprehensive properties (title, description, priority, status, due dates, assignee, timestamps)
- **ID Generation**: Custom UUID generation compatible with all browsers
- **Type Safety**: Full TypeScript integration with Zod schema validation
- **Data Persistence**: Browser localStorage ensures data survives page refreshes and browser sessions

### Data Validation

Zod schemas provide runtime validation and TypeScript types:

- **Insert Schema**: Validates new task creation data
- **Update Schema**: Partial validation for task updates
- **Type Generation**: Automatic TypeScript type generation from schemas

### Development Workflow

- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Full type safety across client, server, and shared code
- **Path Aliases**: Simplified imports using @ aliases for better code organization
- **Hot Reloading**: Development server with instant updates for both frontend and backend

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### State Management & API
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for type-safe data validation

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking and enhanced developer experience

### Styling & Design
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: Conditional class name utilities
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight client-side routing
- **nanoid**: Secure URL-friendly unique ID generator