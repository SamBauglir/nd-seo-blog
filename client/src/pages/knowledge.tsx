import Header from "@/components/header";
import Footer from "@/components/footer";
import KnowledgeSection from "@/components/knowledge-section";

export default function Knowledge() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Knowledge Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight text-gray-900 mb-6">
              BESS <span className="text-[#165DFF]">Knowledge Base</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Comprehensive technical resources, guides, and documentation for BESS professionals and enthusiasts
            </p>
          </div>
        </div>
      </section>

      <KnowledgeSection />
      <Footer />
    </div>
  );
}
