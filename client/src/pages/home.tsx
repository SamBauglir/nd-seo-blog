import Header from "@/components/header";
import Hero from "@/components/hero";
import Stats from "@/components/stats";
import SearchFilters from "@/components/search-filters";
import BlogCard from "@/components/blog-card";
import KnowledgeSection from "@/components/knowledge-section";
import ExpertConsultation from "@/components/expert-consultation";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { BlogPostWithDetails } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import SEOHead from "@/components/seo-head";

export default function Home() {
  const { data: featuredPosts = [], isLoading } = useQuery<BlogPostWithDetails[]>({
    queryKey: ["/api/blog-posts?featured=true&limit=6"],
  });

  const { data: latestPosts = [] } = useQuery<BlogPostWithDetails[]>({
    queryKey: ["/api/blog-posts?limit=6"],
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="BESSEcho - Master BESS Technology & Energy Storage Solutions"
        description="Dive deep into Battery Energy Storage Systems with expert insights, cutting-edge research, and practical solutions for the renewable energy revolution."
        keywords="BESS, battery energy storage, renewable energy, grid storage, lithium-ion, energy management, solar storage, wind power"
        type="website"
        url="https://bessecho.com"
      />
      <Header />
      <Hero />
      <Stats />
      <SearchFilters />
      
      {/* Featured Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
              Latest <span className="text-[#165DFF]">BESS Insights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover cutting-edge research, industry trends, and practical solutions in battery energy storage systems
            </p>
          </div>
          
          {/* Featured Article */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/2">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-[#165DFF] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Featured Article
                      </span>
                      <span 
                        className="text-white px-4 py-2 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: featuredPosts[0].category.color }}
                      >
                        {featuredPosts[0].category.name}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featuredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={featuredPosts[0].author.avatar} 
                          alt={featuredPosts[0].author.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{featuredPosts[0].author.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(featuredPosts[0].publishedAt)}
                          </p>
                        </div>
                      </div>
                      <a 
                        href={`/blog/${featuredPosts[0].slug}`}
                        className="bg-[#165DFF] hover:bg-[#165DFF]/90 text-white px-6 py-3 rounded-lg font-medium transition-all"
                      >
                        Read Full Article
                      </a>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <img 
                      src={featuredPosts[0].image} 
                      alt={featuredPosts[0].title}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <a 
              href="/blog"
              className="bg-gradient-to-r from-[#165DFF] to-[#165DFF]/80 hover:from-[#165DFF]/90 hover:to-[#165DFF]/70 text-white font-semibold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-[#165DFF]/30 transform hover:scale-105 inline-block"
            >
              View All Articles
            </a>
          </div>
        </div>
      </section>
      
      <KnowledgeSection />
      <ExpertConsultation />
      <Footer />
    </div>
  );
}
