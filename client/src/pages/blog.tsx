import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BlogCard from "@/components/blog-card";
import { useQuery } from "@tanstack/react-query";
import type { BlogPostWithDetails, Category } from "@shared/schema";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: allPosts = [], isLoading } = useQuery<BlogPostWithDetails[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Filter posts based on category and search
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category.slug === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Blog Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight text-gray-900 mb-6">
              BESS Technology <span className="text-[#165DFF]">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Stay at the forefront of battery energy storage technology with our expert insights, research findings, and industry analysis
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa fa-search text-gray-400 text-lg"></i>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, technologies, case studies..." 
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all bg-white shadow-sm"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === "all" 
                    ? "bg-[#165DFF] text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                    selectedCategory === category.slug 
                      ? "text-white shadow-lg" 
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                  style={selectedCategory === category.slug ? { backgroundColor: category.color } : {}}
                >
                  <i className={`fa ${category.icon} mr-2`}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "all" ? "All Articles" : categories.find(c => c.slug === selectedCategory)?.name} 
              <span className="text-gray-500 font-normal ml-2">({filteredPosts.length} articles)</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <i className="fa fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">
                {searchQuery ? "Try adjusting your search terms" : "No articles in this category yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
