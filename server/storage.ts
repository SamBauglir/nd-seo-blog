import {
  categories,
  authors,
  blogPosts,
  knowledgeGuides,
  caseStudies,
  experts,
  consultationRequests,
  newsletterSubscriptions,
  type Category,
  type Author,
  type BlogPost,
  type BlogPostWithDetails,
  type KnowledgeGuide,
  type CaseStudy,
  type Expert,
  type ConsultationRequest,
  type NewsletterSubscription,
  type InsertCategory,
  type InsertAuthor,
  type InsertBlogPost,
  type InsertKnowledgeGuide,
  type InsertCaseStudy,
  type InsertExpert,
  type InsertConsultationRequest,
  type InsertNewsletterSubscription,
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Authors
  getAuthors(): Promise<Author[]>;
  getAuthor(id: number): Promise<Author | undefined>;
  
  // Blog Posts
  getBlogPosts(params?: { category?: string; featured?: boolean; limit?: number }): Promise<BlogPostWithDetails[]>;
  getBlogPost(slug: string): Promise<BlogPostWithDetails | undefined>;
  incrementBlogPostViews(id: number): Promise<void>;
  
  // Knowledge Base
  getKnowledgeGuides(): Promise<KnowledgeGuide[]>;
  getCaseStudies(): Promise<CaseStudy[]>;
  
  // Experts
  getExperts(): Promise<Expert[]>;
  
  // Consultation Requests
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  
  // Newsletter
  subscribeNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category> = new Map();
  private authors: Map<number, Author> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private knowledgeGuides: Map<number, KnowledgeGuide> = new Map();
  private caseStudies: Map<number, CaseStudy> = new Map();
  private experts: Map<number, Expert> = new Map();
  private consultationRequests: Map<number, ConsultationRequest> = new Map();
  private newsletterSubscriptions: Map<number, NewsletterSubscription> = new Map();
  
  private currentCategoryId = 1;
  private currentAuthorId = 1;
  private currentBlogPostId = 1;
  private currentKnowledgeGuideId = 1;
  private currentCaseStudyId = 1;
  private currentExpertId = 1;
  private currentConsultationRequestId = 1;
  private currentNewsletterSubscriptionId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoryData: InsertCategory[] = [
      { name: "Technology", slug: "technology", color: "hsl(207, 90%, 54%)", icon: "fa-cogs" },
      { name: "Management", slug: "management", color: "hsl(147, 64%, 57%)", icon: "fa-users" },
      { name: "Market Analysis", slug: "market", color: "hsl(45, 93%, 47%)", icon: "fa-bar-chart" },
      { name: "Case Studies", slug: "case-studies", color: "hsl(196, 100%, 47%)", icon: "fa-file-text-o" },
      { name: "Research", slug: "research", color: "hsl(271, 81%, 56%)", icon: "fa-flask" },
      { name: "Integration", slug: "integration", color: "hsl(147, 64%, 57%)", icon: "fa-plug" },
      { name: "Manufacturing", slug: "manufacturing", color: "hsl(231, 48%, 58%)", icon: "fa-industry" },
    ];

    categoryData.forEach(cat => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...cat, id });
    });

    // Initialize authors
    const authorData: InsertAuthor[] = [
      {
        name: "Dr. Sarah Chen",
        title: "Battery Technology Expert",
        bio: "Leading researcher in solid-state battery technology",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=100&h=100&fit=crop&crop=face",
        experience: "15+ years in battery R&D",
      },
      {
        name: "Mike Zhang",
        title: "BESS Systems Engineer",
        bio: "Specialist in commercial energy storage applications",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        experience: "12+ years in system design",
      },
      {
        name: "Dr. Lisa Wang",
        title: "Renewable Integration Expert",
        bio: "Expert in solar-plus-storage systems",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        experience: "10+ years in renewable energy",
      },
      {
        name: "Alex Rodriguez",
        title: "BMS Technology Specialist",
        bio: "AI-powered battery management systems researcher",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        experience: "8+ years in BMS development",
      },
      {
        name: "Emma Thompson",
        title: "Energy Market Analyst",
        bio: "Global BESS market trends and investment analysis",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        experience: "14+ years in energy markets",
      },
      {
        name: "Robert Kim",
        title: "Manufacturing Expert",
        bio: "Battery cell production and quality control specialist",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        experience: "16+ years in manufacturing",
      },
      {
        name: "Jennifer Park",
        title: "Data Center Solutions Architect",
        bio: "UPS and backup power systems specialist",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        experience: "11+ years in critical infrastructure",
      },
    ];

    authorData.forEach(author => {
      const id = this.currentAuthorId++;
      this.authors.set(id, { ...author, id });
    });

    // Initialize blog posts
    const blogPostData: InsertBlogPost[] = [
      {
        title: "Next-Generation Solid-State Battery Technology for Grid Applications",
        slug: "solid-state-battery-grid-applications",
        excerpt: "Explore the revolutionary potential of solid-state batteries in large-scale energy storage, including breakthrough materials, safety improvements, and commercial viability.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: 1, // Technology
        authorId: 1, // Dr. Sarah Chen
        readTime: 15,
        views: 3245,
        comments: 42,
        likes: 156,
        featured: true,
        publishedAt: new Date("2024-12-15"),
      },
      {
        title: "Optimal BESS System Sizing for Commercial Applications",
        slug: "bess-sizing-commercial-applications",
        excerpt: "Learn how to calculate the ideal battery capacity and power ratings for commercial energy storage projects, including load analysis and cost optimization strategies.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 1, // Technology
        authorId: 2, // Mike Zhang
        readTime: 8,
        views: 2341,
        comments: 34,
        likes: 89,
        featured: false,
        publishedAt: new Date("2024-12-10"),
      },
      {
        title: "Solar-Plus-Storage: Design Considerations and Best Practices",
        slug: "solar-plus-storage-design-practices",
        excerpt: "Comprehensive guide to integrating battery storage with solar PV systems, covering system design, inverter selection, and grid interconnection requirements.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 6, // Integration
        authorId: 3, // Dr. Lisa Wang
        readTime: 12,
        views: 1876,
        comments: 28,
        likes: 67,
        featured: false,
        publishedAt: new Date("2024-12-08"),
      },
      {
        title: "Advanced BMS Features: AI-Powered Battery Health Monitoring",
        slug: "ai-powered-bms-health-monitoring",
        excerpt: "Discover how artificial intelligence and machine learning are revolutionizing battery management systems, enabling predictive maintenance and extended battery life.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 2, // Management
        authorId: 4, // Alex Rodriguez
        readTime: 10,
        views: 3124,
        comments: 45,
        likes: 112,
        featured: false,
        publishedAt: new Date("2024-12-05"),
      },
      {
        title: "Global BESS Market Trends: 2024 Investment Outlook",
        slug: "global-bess-market-trends-2024",
        excerpt: "Analysis of current market dynamics, investment patterns, and emerging opportunities in the global battery energy storage sector for 2024 and beyond.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 3, // Market Analysis
        authorId: 5, // Emma Thompson
        readTime: 6,
        views: 1567,
        comments: 19,
        likes: 43,
        featured: false,
        publishedAt: new Date("2024-12-03"),
      },
      {
        title: "Quality Control in Battery Cell Manufacturing",
        slug: "quality-control-battery-manufacturing",
        excerpt: "Essential quality control processes and testing protocols for lithium-ion battery cell production, ensuring safety, performance, and longevity standards.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 7, // Manufacturing
        authorId: 6, // Robert Kim
        readTime: 9,
        views: 987,
        comments: 15,
        likes: 28,
        featured: false,
        publishedAt: new Date("2024-12-01"),
      },
      {
        title: "Data Center UPS Backup: BESS vs Traditional Solutions",
        slug: "data-center-bess-vs-traditional-ups",
        excerpt: "Comprehensive comparison of battery energy storage systems versus traditional UPS solutions for data center backup power, including cost analysis and performance metrics.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 4, // Case Studies
        authorId: 7, // Jennifer Park
        readTime: 14,
        views: 2456,
        comments: 37,
        likes: 84,
        featured: false,
        publishedAt: new Date("2024-11-28"),
      },
    ];

    blogPostData.forEach(post => {
      const id = this.currentBlogPostId++;
      this.blogPosts.set(id, { ...post, id, createdAt: new Date() });
    });

    // Initialize knowledge guides
    const knowledgeGuideData: InsertKnowledgeGuide[] = [
      {
        title: "BESS System Design Fundamentals",
        description: "Complete guide to battery system architecture and component selection",
        icon: "fa-cogs",
        color: "hsl(207, 90%, 54%)",
        url: "/knowledge/system-design",
      },
      {
        title: "Safety Standards & Compliance",
        description: "Essential safety protocols and regulatory requirements for BESS deployment",
        icon: "fa-shield",
        color: "hsl(147, 64%, 57%)",
        url: "/knowledge/safety-compliance",
      },
      {
        title: "Performance Optimization",
        description: "Advanced techniques for maximizing BESS efficiency and ROI",
        icon: "fa-line-chart",
        color: "hsl(271, 81%, 56%)",
        url: "/knowledge/performance-optimization",
      },
    ];

    knowledgeGuideData.forEach(guide => {
      const id = this.currentKnowledgeGuideId++;
      this.knowledgeGuides.set(id, { ...guide, id });
    });

    // Initialize case studies
    const caseStudyData: InsertCaseStudy[] = [
      {
        title: "100MW Solar + 50MWh BESS Project",
        description: "Implementation challenges and solutions for large-scale renewable integration",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        category: "Utility Scale",
        url: "/case-studies/utility-scale-solar-bess",
      },
      {
        title: "Corporate Campus Microgrid",
        description: "Behind-the-meter storage for demand charge reduction and backup power",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        category: "Commercial",
        url: "/case-studies/corporate-microgrid",
      },
    ];

    caseStudyData.forEach(study => {
      const id = this.currentCaseStudyId++;
      this.caseStudies.set(id, { ...study, id });
    });

    // Initialize experts
    const expertData: InsertExpert[] = [
      {
        name: "Dr. Michael Chen",
        title: "Senior BESS Engineer",
        experience: "15+ years in grid-scale storage",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        color: "hsl(207, 90%, 54%)",
      },
      {
        name: "Sarah Johnson",
        title: "Energy Systems Specialist",
        experience: "12+ years in renewable integration",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        color: "hsl(147, 64%, 57%)",
      },
      {
        name: "Dr. Alex Kim",
        title: "Battery Technology Researcher",
        experience: "10+ years in battery R&D",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        color: "hsl(271, 81%, 56%)",
      },
    ];

    expertData.forEach(expert => {
      const id = this.currentExpertId++;
      this.experts.set(id, { ...expert, id });
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async getAuthors(): Promise<Author[]> {
    return Array.from(this.authors.values());
  }

  async getAuthor(id: number): Promise<Author | undefined> {
    return this.authors.get(id);
  }

  async getBlogPosts(params?: { category?: string; featured?: boolean; limit?: number }): Promise<BlogPostWithDetails[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (params?.featured !== undefined) {
      posts = posts.filter(post => post.featured === params.featured);
    }
    
    if (params?.category) {
      const category = Array.from(this.categories.values()).find(cat => cat.slug === params.category);
      if (category) {
        posts = posts.filter(post => post.categoryId === category.id);
      }
    }
    
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    if (params?.limit) {
      posts = posts.slice(0, params.limit);
    }
    
    return posts.map(post => ({
      ...post,
      category: this.categories.get(post.categoryId)!,
      author: this.authors.get(post.authorId)!,
    }));
  }

  async getBlogPost(slug: string): Promise<BlogPostWithDetails | undefined> {
    const post = Array.from(this.blogPosts.values()).find(post => post.slug === slug);
    if (!post) return undefined;
    
    return {
      ...post,
      category: this.categories.get(post.categoryId)!,
      author: this.authors.get(post.authorId)!,
    };
  }

  async incrementBlogPostViews(id: number): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      this.blogPosts.set(id, { ...post, views: post.views + 1 });
    }
  }

  async getKnowledgeGuides(): Promise<KnowledgeGuide[]> {
    return Array.from(this.knowledgeGuides.values());
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values());
  }

  async getExperts(): Promise<Expert[]> {
    return Array.from(this.experts.values());
  }

  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.currentConsultationRequestId++;
    const consultationRequest: ConsultationRequest = {
      ...request,
      id,
      createdAt: new Date(),
    };
    this.consultationRequests.set(id, consultationRequest);
    return consultationRequest;
  }

  async subscribeNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const existing = Array.from(this.newsletterSubscriptions.values()).find(
      sub => sub.email === subscription.email
    );
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.currentNewsletterSubscriptionId++;
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      createdAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }
}

export const storage = new MemStorage();
