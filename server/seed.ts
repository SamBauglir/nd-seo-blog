import { db } from "./db";
import {
  categories,
  authors,
  blogPosts,
  knowledgeGuides,
  caseStudies,
  experts,
  type InsertCategory,
  type InsertAuthor,
  type InsertBlogPost,
  type InsertKnowledgeGuide,
  type InsertCaseStudy,
  type InsertExpert,
} from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed categories
  const categoryData: InsertCategory[] = [
    { name: "Technology", slug: "technology", color: "hsl(207, 90%, 54%)", icon: "fa-cogs" },
    { name: "Management", slug: "management", color: "hsl(147, 64%, 57%)", icon: "fa-users" },
    { name: "Market Analysis", slug: "market", color: "hsl(45, 93%, 47%)", icon: "fa-bar-chart" },
    { name: "Case Studies", slug: "case-studies", color: "hsl(196, 100%, 47%)", icon: "fa-file-text-o" },
    { name: "Research", slug: "research", color: "hsl(271, 81%, 56%)", icon: "fa-flask" },
    { name: "Integration", slug: "integration", color: "hsl(147, 64%, 57%)", icon: "fa-plug" },
    { name: "Manufacturing", slug: "manufacturing", color: "hsl(231, 48%, 58%)", icon: "fa-industry" },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  // Seed authors
  const authorData: InsertAuthor[] = [
    {
      name: "Dr. Sarah Chen",
      title: "Battery Technology Expert",
      bio: "Leading researcher in solid-state battery technology",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=0ea5e9&color=fff&size=128&font-size=0.6",
      experience: "15+ years in battery R&D",
    },
    {
      name: "Mike Zhang",
      title: "BESS Systems Engineer",
      bio: "Specialist in commercial energy storage applications",
      avatar: "https://ui-avatars.com/api/?name=Mike+Zhang&background=8b5cf6&color=fff&size=128&font-size=0.6",
      experience: "12+ years in system design",
    },
    {
      name: "Dr. Lisa Wang",
      title: "Renewable Integration Expert",
      bio: "Expert in solar-plus-storage systems",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Wang&background=f59e0b&color=fff&size=128&font-size=0.6",
      experience: "10+ years in renewable energy",
    },
    {
      name: "Alex Rodriguez",
      title: "BMS Technology Specialist",
      bio: "AI-powered battery management systems researcher",
      avatar: "https://ui-avatars.com/api/?name=Alex+Rodriguez&background=ef4444&color=fff&size=128&font-size=0.6",
      experience: "8+ years in BMS development",
    },
    {
      name: "Emma Thompson",
      title: "Energy Market Analyst",
      bio: "Global BESS market trends and investment analysis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Thompson&background=10b981&color=fff&size=128&font-size=0.6",
      experience: "14+ years in energy markets",
    },
    {
      name: "Robert Kim",
      title: "Manufacturing Expert",
      bio: "Battery cell production and quality control specialist",
      avatar: "https://ui-avatars.com/api/?name=Robert+Kim&background=3b82f6&color=fff&size=128&font-size=0.6",
      experience: "16+ years in manufacturing",
    },
    {
      name: "Jennifer Park",
      title: "Data Center Solutions Architect",
      bio: "UPS and backup power systems specialist",
      avatar: "https://ui-avatars.com/api/?name=Jennifer+Park&background=ec4899&color=fff&size=128&font-size=0.6",
      experience: "11+ years in critical infrastructure",
    },
  ];

  const insertedAuthors = await db.insert(authors).values(authorData).returning();
  console.log(`✅ Inserted ${insertedAuthors.length} authors`);

  // Seed blog posts
  const blogPostData: InsertBlogPost[] = [
    {
      title: "Next-Generation Solid-State Battery Technology for Grid Applications",
      slug: "solid-state-battery-grid-applications",
      excerpt: "Explore the revolutionary potential of solid-state batteries in large-scale energy storage, including breakthrough materials, safety improvements, and commercial viability.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      categoryId: insertedCategories[0].id, // Technology
      authorId: insertedAuthors[0].id, // Dr. Sarah Chen
      readTime: 15,
      featured: true,
      publishedAt: new Date("2024-12-15"),
    },
    {
      title: "Optimal BESS System Sizing for Commercial Applications",
      slug: "bess-sizing-commercial-applications",
      excerpt: "Learn how to properly size battery energy storage systems for commercial and industrial facilities to maximize ROI and system performance.",
      content: "Detailed sizing methodology...",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      categoryId: insertedCategories[1].id, // Management
      authorId: insertedAuthors[1].id, // Mike Zhang
      readTime: 12,
      featured: true,
      publishedAt: new Date("2024-12-10"),
    },
    {
      title: "Integration Challenges in Solar-Plus-Storage Projects",
      slug: "solar-storage-integration-challenges",
      excerpt: "Addressing the technical and regulatory challenges in combining solar PV with battery storage systems for maximum efficiency.",
      content: "Integration best practices...",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      categoryId: insertedCategories[5].id, // Integration
      authorId: insertedAuthors[2].id, // Dr. Lisa Wang
      readTime: 18,
      featured: false,
      publishedAt: new Date("2024-12-08"),
    },
    {
      title: "AI-Powered Battery Management: The Future of BESS",
      slug: "ai-battery-management-systems",
      excerpt: "How artificial intelligence is revolutionizing battery management systems for improved safety, performance, and longevity.",
      content: "AI BMS implementation...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      categoryId: insertedCategories[0].id, // Technology
      authorId: insertedAuthors[3].id, // Alex Rodriguez
      readTime: 14,
      featured: true,
      publishedAt: new Date("2024-12-05"),
    },
  ];

  const insertedBlogPosts = await db.insert(blogPosts).values(blogPostData).returning();
  console.log(`✅ Inserted ${insertedBlogPosts.length} blog posts`);

  // Seed knowledge guides
  const knowledgeGuideData: InsertKnowledgeGuide[] = [
    {
      title: "BESS System Design Fundamentals",
      description: "Complete guide to designing battery energy storage systems",
      icon: "fa-cogs",
      color: "hsl(207, 90%, 54%)",
      url: "/knowledge/system-design-fundamentals",
    },
    {
      title: "Safety Standards and Compliance",
      description: "Understanding UL, IEC, and other safety standards for BESS",
      icon: "fa-shield",
      color: "hsl(45, 93%, 47%)",
      url: "/knowledge/safety-standards",
    },
  ];

  const insertedGuides = await db.insert(knowledgeGuides).values(knowledgeGuideData).returning();
  console.log(`✅ Inserted ${insertedGuides.length} knowledge guides`);

  // Seed case studies
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

  const insertedCaseStudies = await db.insert(caseStudies).values(caseStudyData).returning();
  console.log(`✅ Inserted ${insertedCaseStudies.length} case studies`);

  // Seed experts
  const expertData: InsertExpert[] = [
    {
      name: "Dr. Michael Chen",
      title: "Senior BESS Engineer",
      experience: "15+ years in grid-scale storage",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff&size=128&font-size=0.6",
      rating: 5,
      color: "hsl(207, 90%, 54%)",
    },
    {
      name: "Sarah Johnson",
      title: "Energy Systems Specialist",
      experience: "12+ years in renewable integration",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&size=128&font-size=0.6",
      rating: 5,
      color: "hsl(147, 64%, 57%)",
    },
    {
      name: "Dr. Alex Kim",
      title: "Battery Technology Researcher",
      experience: "10+ years in battery R&D",
      avatar: "https://ui-avatars.com/api/?name=Alex+Kim&background=8b5cf6&color=fff&size=128&font-size=0.6",
      rating: 5,
      color: "hsl(271, 81%, 56%)",
    },
  ];

  const insertedExperts = await db.insert(experts).values(expertData).returning();
  console.log(`✅ Inserted ${insertedExperts.length} experts`);

  console.log("🎉 Database seeded successfully!");
}

export { seed };

// Run seed if called directly
seed().catch(console.error);