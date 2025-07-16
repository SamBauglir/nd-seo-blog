import { useQuery } from "@tanstack/react-query";
import type { KnowledgeGuide, CaseStudy } from "@shared/schema";

export default function KnowledgeSection() {
  const { data: guides = [] } = useQuery<KnowledgeGuide[]>({
    queryKey: ["/api/knowledge-guides"],
  });

  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
            BESS <span className="text-[#165DFF]">Knowledge Base</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical resources, guides, and documentation for BESS professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Technical Guides */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fa fa-book text-[#165DFF] mr-3"></i>
              Technical Guides
            </h3>
            
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white p-6 rounded-xl shadow-md card-hover border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${guide.color}1A` }}
                  >
                    <i 
                      className={`fa ${guide.icon} text-xl`}
                      style={{ color: guide.color }}
                    ></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{guide.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <a 
                      href={guide.url} 
                      className="text-[#165DFF] font-medium text-sm hover:underline"
                    >
                      View Guide →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Case Studies */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fa fa-file-text-o text-[#36D399] mr-3"></i>
              Case Studies
            </h3>
            
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white p-6 rounded-xl shadow-md card-hover border border-gray-100">
                <div className="mb-4">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <span className="bg-[#165DFF]/10 text-[#165DFF] px-3 py-1 rounded-full text-xs font-semibold">
                    {study.category}
                  </span>
                  <h4 className="font-semibold mt-3 mb-2">{study.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                  <a 
                    href={study.url} 
                    className="text-[#165DFF] font-medium text-sm hover:underline"
                  >
                    Read Case Study →
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tools & Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fa fa-wrench text-amber-500 mr-3"></i>
              Tools & Calculators
            </h3>
            
            <div className="bg-white p-6 rounded-xl shadow-md card-hover border border-gray-100">
              <div className="text-center mb-4">
                <div className="bg-[#165DFF]/10 p-4 rounded-full inline-block">
                  <i className="fa fa-calculator text-[#165DFF] text-2xl"></i>
                </div>
              </div>
              <h4 className="font-semibold text-center mb-2">Battery Sizing Calculator</h4>
              <p className="text-gray-600 text-sm text-center mb-4">
                Calculate optimal battery capacity for your application
              </p>
              <button className="w-full bg-[#165DFF] hover:bg-[#165DFF]/90 text-white py-3 rounded-lg font-medium transition-all">
                Launch Calculator
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md card-hover border border-gray-100">
              <div className="text-center mb-4">
                <div className="bg-[#36D399]/10 p-4 rounded-full inline-block">
                  <i className="fa fa-dollar text-[#36D399] text-2xl"></i>
                </div>
              </div>
              <h4 className="font-semibold text-center mb-2">ROI Analysis Tool</h4>
              <p className="text-gray-600 text-sm text-center mb-4">
                Evaluate financial benefits and payback periods
              </p>
              <button className="w-full bg-[#36D399] hover:bg-[#36D399]/90 text-white py-3 rounded-lg font-medium transition-all">
                Start Analysis
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md card-hover border border-gray-100">
              <div className="text-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full inline-block">
                  <i className="fa fa-download text-purple-600 text-2xl"></i>
                </div>
              </div>
              <h4 className="font-semibold text-center mb-2">Technical Documentation</h4>
              <p className="text-gray-600 text-sm text-center mb-4">
                Downloadable specs, manuals, and reference materials
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-all">
                Browse Downloads
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
