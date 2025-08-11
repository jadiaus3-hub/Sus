# Task Manager - CRUD Application

## Overview

A full-stack task management application built with React, Express, and PostgreSQL. The application provides a comprehensive dashboard for managing tasks with CRUD operations, filtering capabilities, and real-time statistics. Users can create, edit, delete, and track tasks with different priorities and statuses, including due date management and assignee tracking.

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

### Backend Architecture

Express.js server with TypeScript providing REST API endpoints:

- **API Structure**: RESTful endpoints for task CRUD operations and statistics
- **Data Layer**: Abstract storage interface with in-memory implementation (MemStorage)
- **Schema Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Hot module replacement with Vite integration in development

The backend uses an interface-based storage abstraction, making it easy to swap storage implementations without changing business logic.

### Database Schema

PostgreSQL database with Drizzle ORM:

- **Tasks Table**: Comprehensive task entity with fields for title, description, priority, status, due dates, assignee, and timestamps
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Type Safety**: Full TypeScript integration with inferred types from schema definitions

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