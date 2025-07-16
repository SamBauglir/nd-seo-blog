# BESSEcho - BESS Technology Blog Platform

A modern, SEO-optimized blog platform focused on Battery Energy Storage Systems (BESS) technology, built with React, Express.js, and PostgreSQL.

## Features

### Core Features
- **Modern Blog Platform**: Full-featured blog with categories, authors, and rich content
- **Admin Dashboard**: Complete CMS for content management
- **Rich Text Editor**: EditorJS integration with image upload support
- **SEO Optimized**: Dynamic meta tags, sitemaps, and structured data
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database-Driven**: PostgreSQL with Drizzle ORM for robust data management

### SEO Features
- **Dynamic Meta Tags**: Automatic title, description, and Open Graph tags
- **Structured Data**: JSON-LD schema for articles and website
- **XML Sitemap**: Auto-generated sitemap at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots.txt at `/robots.txt`
- **Article Schema**: Rich snippets for blog posts
- **Social Media Integration**: Open Graph and Twitter Card support

### Technical Features
- **Image Upload**: File upload with URL fallback for Editor.js
- **Type Safety**: Full TypeScript coverage across client and server
- **Real-time Updates**: Hot module replacement in development
- **Performance**: Optimized builds with Vite and esbuild
- **Database Migrations**: Drizzle Kit for schema management

## Architecture

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with shadcn/ui components
- **EditorJS** for rich content creation

### Backend
- **Express.js** server with TypeScript
- **PostgreSQL** database with Drizzle ORM
- **Multer** for file uploads
- **Zod** for validation

### Database Schema
```sql
-- Core entities
- blog_posts (with optional excerpt and image)
- categories (for content organization)
- authors (content creators)
- knowledge_guides (technical documentation)
- case_studies (real-world examples)
- experts (consultation services)
- consultation_requests (user inquiries)
- newsletter_subscriptions (email marketing)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bessecho
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/bessecho"

# Additional PostgreSQL variables (automatically set by Replit)
PGDATABASE=bessecho
PGHOST=localhost
PGPORT=5432
PGUSER=username
PGPASSWORD=password
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

### Database Management

```bash
# Push schema changes to database
npm run db:push

# Generate migrations (if needed)
npm run db:generate

# View database in Drizzle Studio
npm run db:studio
```

## SEO Implementation

### Meta Tags
The platform automatically generates:
- Dynamic page titles and descriptions
- Open Graph tags for social media
- Twitter Card metadata
- Article-specific schema for blog posts

### Sitemap Generation
- Auto-generated XML sitemap at `/sitemap.xml`
- Includes all blog posts, categories, and static pages
- Updates automatically when content changes

### Structured Data
- JSON-LD schema for articles and website
- Rich snippets for search engines
- Author and publisher information

### URL Structure
- SEO-friendly URLs: `/blog/post-slug`
- Category pages: `/blog/category/category-slug`
- Clean, descriptive paths throughout

## Content Management

### Admin Dashboard
Access the admin panel at `/admin` to:
- Create, edit, and delete blog posts
- Manage categories and authors
- Upload images and media
- Set featured posts and excerpts

### Rich Text Editor
- Block-style editing with EditorJS
- Image upload with drag-and-drop
- URL embedding for external images
- HTML export for blog rendering

### Optional Fields
- **Excerpt**: Brief post description (optional)
- **Featured Image**: Post header image (optional)
- Both fields clearly marked as optional in admin interface

## API Endpoints

### Content API
```
GET /api/blog-posts - List all blog posts
GET /api/blog-posts/:slug - Get specific post
GET /api/categories - List categories
GET /api/authors - List authors
POST /api/blog-posts - Create new post
PUT /api/blog-posts/:id - Update post
DELETE /api/blog-posts/:id - Delete post
```

### SEO API
```
GET /sitemap.xml - XML sitemap
GET /robots.txt - Robots.txt file
```

### Upload API
```
POST /api/upload-image - Upload image file
GET /uploads/:filename - Serve uploaded images
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
- Set production DATABASE_URL
- Configure domain for sitemap generation
- Set up SSL/TLS certificates
- Configure CDN for static assets (optional)

### Replit Deployment
The project is configured for easy deployment on Replit:
- Automatic PostgreSQL database provisioning
- Environment variables pre-configured
- One-click deployment available

## File Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities
│   │   └── hooks/         # Custom hooks
├── server/                # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   ├── sitemap.ts         # SEO sitemap generation
│   └── db.ts              # Database connection
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── uploads/               # User-uploaded images
└── dist/                  # Production build output
```

## Performance Optimizations

### Frontend
- Code splitting with React.lazy
- Image optimization and lazy loading
- Efficient re-renders with React Query
- Optimized bundle sizes with Vite

### Backend
- Database query optimization
- Efficient joins for blog post details
- Caching headers for static assets
- Compressed responses

### SEO
- Fast page loads for better rankings
- Structured data for rich snippets
- Mobile-first responsive design
- Clean URL structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support with BESS technology content or platform usage, please refer to the knowledge base or contact our editorial team.