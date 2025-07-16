import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter-subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest BESS insights in your inbox.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-[#1E293B] text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#165DFF] p-2 rounded-lg">
                <i className="fa fa-bolt text-xl"></i>
              </div>
              <span className="text-xl font-bold">BESSEcho</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted source for BESS technology insights, expert guidance, and industry knowledge.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
                <i className="fa fa-youtube-play"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/blog" className="block text-gray-300 hover:text-white transition-colors">Latest Articles</a>
              <a href="/knowledge" className="block text-gray-300 hover:text-white transition-colors">Knowledge Base</a>
              <a href="#search" className="block text-gray-300 hover:text-white transition-colors">Search</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">Expert Consultation</a>
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <a href="/blog?category=technology" className="block text-gray-300 hover:text-white transition-colors">Technology</a>
              <a href="/blog?category=management" className="block text-gray-300 hover:text-white transition-colors">Management</a>
              <a href="/blog?category=market" className="block text-gray-300 hover:text-white transition-colors">Market Analysis</a>
              <a href="/blog?category=case-studies" className="block text-gray-300 hover:text-white transition-colors">Case Studies</a>
              <a href="/blog?category=research" className="block text-gray-300 hover:text-white transition-colors">Research</a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm">Get the latest BESS insights delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
              />
              <button 
                type="submit"
                disabled={newsletterMutation.isPending}
                className="w-full bg-[#165DFF] hover:bg-[#165DFF]/90 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2024 BESSEcho. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
