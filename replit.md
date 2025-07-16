# BESSEcho - BESS Technology Blog Platform

## Overview

BESSEcho is a modern web application focused on Battery Energy Storage Systems (BESS) technology. It serves as a comprehensive knowledge platform featuring blog posts, technical guides, case studies, and expert consultation services. The application is built with a full-stack architecture using React for the frontend and Express.js for the backend, with PostgreSQL as the database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for client-side navigation

## Key Components

### Frontend Architecture
- **Component Library**: Built using shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and BESS-themed colors
- **State Management**: React Query for API data fetching and caching
- **Forms**: React Hook Form with Zod validation
- **Routing**: File-based routing using Wouter

### Backend Architecture
- **API Layer**: RESTful API built with Express.js
- **Database Layer**: Drizzle ORM with PostgreSQL database
- **Schema Validation**: Zod schemas shared between client and server
- **Error Handling**: Centralized error handling middleware

### Database Schema
The application manages several key entities:
- **Blog Posts**: Articles with categories, authors, and engagement metrics
- **Categories**: Content categorization with visual styling
- **Authors**: Content creators with profiles and expertise
- **Knowledge Guides**: Technical documentation and guides
- **Case Studies**: Real-world implementation examples
- **Experts**: Professional profiles for consultation services
- **Consultation Requests**: User inquiries for expert advice
- **Newsletter Subscriptions**: Email marketing list management

## Data Flow

1. **Content Management**: Blog posts, guides, and case studies are stored in PostgreSQL
2. **API Layer**: Express.js serves RESTful endpoints for all content operations
3. **Client Fetching**: React Query manages API calls with caching and background updates
4. **User Interactions**: Forms for consultation requests and newsletter subscriptions
5. **Real-time Updates**: View count increments and engagement tracking

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon DB
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight client-side routing
- **zod**: Runtime type validation

### UI Components
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the stack
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

The application is configured for deployment with:

- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Environment Configuration**: DATABASE_URL required for PostgreSQL connection
- **Static Assets**: Frontend builds to `dist/public`, backend to `dist/`
- **Development Mode**: Concurrent client and server development with hot reloading

### Scripts
- `dev`: Development server with hot reloading
- `build`: Production build for both client and server
- `start`: Production server startup
- `db:push`: Database schema synchronization

## Recent Changes: Latest modifications with dates

**January 16, 2025:**
- Added comprehensive SEO optimization features
- Created dynamic meta tags component (SEOHead) for all pages
- Implemented XML sitemap generation at `/sitemap.xml`
- Added robots.txt generation at `/robots.txt`
- Integrated structured data (JSON-LD) for articles and website
- Added Open Graph and Twitter Card meta tags
- Made excerpt and featured image fields optional in admin panel
- Updated database schema to allow null values for optional fields
- Added Narada Power Source support banner to hero section
- Prepared project for download with complete SEO foundation

The architecture prioritizes developer experience with TypeScript throughout, shared schemas for type safety, and modern tooling for fast development cycles. The modular component structure and clear API boundaries make the codebase maintainable and scalable.