export default function Hero() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-[#165DFF]/10 text-[#165DFF] font-semibold px-4 py-2 rounded-full text-sm">
                🚀 Advanced BESS Technology Hub
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight text-gray-900">
                Master <span className="text-[#165DFF]">BESS Technology</span><br />
                Transform Energy Storage
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                Dive deep into Battery Energy Storage Systems with expert insights, cutting-edge research, and practical solutions for the renewable energy revolution.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/blog" 
                className="bg-[#165DFF] hover:bg-[#165DFF]/90 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#165DFF]/30 flex items-center space-x-2"
              >
                <span>Explore Articles</span>
                <i className="fa fa-arrow-right"></i>
              </a>
              <a 
                href="/knowledge" 
                className="bg-white hover:bg-gray-50 text-[#165DFF] border-2 border-[#165DFF] font-semibold py-4 px-8 rounded-xl transition-all flex items-center space-x-2"
              >
                <i className="fa fa-database"></i>
                <span>Knowledge Base</span>
              </a>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                    alt="BESS Expert" 
                    className="w-12 h-12 rounded-full border-3 border-white shadow-md" 
                  />
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1664203068145-b1d7d1680f6c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Energy Engineer" 
                    className="w-12 h-12 rounded-full border-3 border-white shadow-md" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                    alt="Research Scientist" 
                    className="w-12 h-12 rounded-full border-3 border-white shadow-md" 
                  />
                  <div className="w-12 h-12 rounded-full border-3 border-white shadow-md bg-[#165DFF] flex items-center justify-center text-white font-bold text-sm">
                    5K+
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Trusted by industry leaders</p>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">4.9/5 (2,341 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            {/* Featured Hero Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Advanced BESS facility with solar integration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-[#36D399] text-white text-sm font-semibold px-3 py-1 rounded-full">Featured</span>
                    <span className="bg-[#165DFF]/90 text-white text-sm font-semibold px-3 py-1 rounded-full">New Technology</span>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">Grid-Scale BESS Integration</h3>
                  <p className="text-white/90 text-sm">Revolutionary approaches to large-scale energy storage deployment and smart grid integration</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#36D399]/20 rounded-full -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#165DFF]/10 rounded-full -z-10"></div>
            <div className="absolute top-1/2 -right-6 w-24 h-24 bg-purple-200/30 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
