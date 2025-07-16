import type { BlogPostWithDetails } from "@shared/schema";

interface BlogCardProps {
  post: BlogPostWithDetails;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span 
            className="text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white transition-all">
            <i className="fa fa-bookmark-o"></i>
          </button>
        </div>
        {post.featured && (
          <div className="absolute top-14 left-4">
            <span className="bg-amber-500 text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <i className="fa fa-calendar-o mr-2"></i>
          <span>{post.publishedAt.toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <i className="fa fa-user-o mr-2"></i>
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3 className="text-xl font-bold mb-3 hover:text-[#165DFF] transition-colors line-clamp-2">
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <a 
            href={`/blog/${post.slug}`}
            className="text-[#165DFF] font-semibold hover:underline"
          >
            Read More
          </a>
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <span>
              <i className="fa fa-eye mr-1"></i>
              {post.views.toLocaleString()}
            </span>
            <span>
              <i className="fa fa-comment-o mr-1"></i>
              {post.comments}
            </span>
            <span>
              <i className="fa fa-heart-o mr-1"></i>
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
