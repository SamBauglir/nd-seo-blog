import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export default function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement actual search functionality
    console.log("Search query:", query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // TODO: Implement category filtering
    console.log("Selected category:", category);
  };

  return (
    <section id="search" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">
              Find <span className="text-[#165DFF]">Expert Knowledge</span>
            </h2>
            <p className="text-lg text-gray-600">
              Search through our comprehensive library of BESS technology resources
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fa fa-search text-gray-400 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles, technologies, case studies..." 
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all bg-white shadow-sm"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => handleCategoryChange("all")}
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
                onClick={() => handleCategoryChange(category.slug)}
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
  );
}
