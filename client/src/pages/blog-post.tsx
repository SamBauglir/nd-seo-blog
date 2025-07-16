import { useRoute } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { BlogPostWithDetails } from "@shared/schema";
import { formatDate } from "@/lib/utils";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPostWithDetails>({
    queryKey: [`/api/blog-posts/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <a 
              href="/blog" 
              className="bg-[#165DFF] hover:bg-[#165DFF]/90 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <span 
                className="text-white px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
              {post.featured && (
                <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>
                  <i className="fa fa-calendar-o mr-1"></i>
                  {formatDate(post.publishedAt)}
                </span>
                <span>
                  <i className="fa fa-clock-o mr-1"></i>
                  {post.readTime} min read
                </span>
                <span>
                  <i className="fa fa-eye mr-1"></i>
                  {post.views.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </div>
            
            {/* Article body from rich text editor */}
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
          
          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#165DFF] transition-colors">
                  <i className="fa fa-heart-o"></i>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#165DFF] transition-colors">
                  <i className="fa fa-comment-o"></i>
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#165DFF] transition-colors">
                  <i className="fa fa-share"></i>
                  <span>Share</span>
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all">
                  <i className="fa fa-facebook text-blue-600"></i>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all">
                  <i className="fa fa-twitter text-blue-400"></i>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all">
                  <i className="fa fa-linkedin text-blue-700"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <div className="flex items-start space-x-6">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author.name}</h3>
                <p className="text-[#165DFF] font-medium mb-3">{post.author.title}</p>
                <p className="text-gray-600 leading-relaxed">
                  {post.author.bio || `${post.author.name} is an expert in BESS technology with ${post.author.experience} of experience in the field.`}
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <a 
              href="/blog" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all flex items-center"
            >
              <i className="fa fa-arrow-left mr-2"></i>
              Back to Blog
            </a>
            <a 
              href="/contact" 
              className="bg-[#165DFF] hover:bg-[#165DFF]/90 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Contact Expert
            </a>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}
