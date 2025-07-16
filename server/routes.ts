import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema, insertNewsletterSubscriptionSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { generateSitemap, generateRobotsTxt } from "./sitemap";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadsDir));

  // Image upload by file
  app.post("/api/upload-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        success: 1,
        file: {
          url: fileUrl,
          size: req.file.size,
          name: req.file.originalname,
        }
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ success: 0, message: "Upload failed" });
    }
  });

  // Image upload by URL
  app.post("/api/upload-image-by-url", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ success: 0, message: "URL is required" });
      }

      // For now, we'll just return the URL as-is (external URL)
      // In production, you might want to download and store the image locally
      res.json({
        success: 1,
        file: {
          url: url,
          size: 0, // Unknown size for external URLs
          name: url.split('/').pop() || 'image',
        }
      });
    } catch (error) {
      console.error("URL upload error:", error);
      res.status(500).json({ success: 0, message: "Upload failed" });
    }
  });

  // Link preview endpoint for LinkTool
  app.post("/api/fetch-url", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ success: 0, message: "URL is required" });
      }

      // Simple response for link preview
      res.json({
        success: 1,
        link: url,
        meta: {
          title: "Link",
          description: "External link",
          image: {
            url: ""
          }
        }
      });
    } catch (error) {
      console.error("URL fetch error:", error);
      res.status(500).json({ success: 0, message: "Failed to fetch URL" });
    }
  });
  // Blog posts routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { category, featured, limit } = req.query;
      const posts = await storage.getBlogPosts({
        category: category as string,
        featured: featured === "true",
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Increment view count
      await storage.incrementBlogPostViews(post.id);
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Knowledge base routes
  app.get("/api/knowledge-guides", async (req, res) => {
    try {
      const guides = await storage.getKnowledgeGuides();
      res.json(guides);
    } catch (error) {
      console.error("Error fetching knowledge guides:", error);
      res.status(500).json({ message: "Failed to fetch knowledge guides" });
    }
  });

  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  // Experts routes
  app.get("/api/experts", async (req, res) => {
    try {
      const experts = await storage.getExperts();
      res.json(experts);
    } catch (error) {
      console.error("Error fetching experts:", error);
      res.status(500).json({ message: "Failed to fetch experts" });
    }
  });

  // Consultation request
  app.post("/api/consultation-requests", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
      res.json({ message: "Consultation request submitted successfully", request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error creating consultation request:", error);
      res.status(500).json({ message: "Failed to submit consultation request" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter-subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(validatedData);
      res.json({ message: "Successfully subscribed to newsletter", subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      if (error instanceof Error && error.message === "Email already subscribed") {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // CMS Routes for managing blog posts
  app.get("/api/authors", async (req, res) => {
    try {
      const authors = await storage.getAuthors();
      res.json(authors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
      }

      const post = await storage.createBlogPost(result.data);
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid data", errors: result.error.issues });
      }

      const post = await storage.updateBlogPost(id, result.data);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // SEO Routes
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = req.protocol + '://' + req.get('host');
      const sitemap = await generateSitemap(baseUrl);
      res.set('Content-Type', 'text/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).json({ message: "Failed to generate sitemap" });
    }
  });

  app.get("/robots.txt", async (req, res) => {
    try {
      const baseUrl = req.protocol + '://' + req.get('host');
      const robots = await generateRobotsTxt(baseUrl);
      res.set('Content-Type', 'text/plain');
      res.send(robots);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).json({ message: "Failed to generate robots.txt" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
