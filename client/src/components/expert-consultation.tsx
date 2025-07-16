import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Expert } from "@shared/schema";

export default function ExpertConsultation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    consultationType: "",
    message: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: experts = [] } = useQuery<Expert[]>({
    queryKey: ["/api/experts"],
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/consultation-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Submitted",
        description: "Our team will contact you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        consultationType: "",
        message: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit consultation request",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultationMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
              Need Expert <span className="text-[#165DFF]">Consultation?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Connect with certified BESS professionals for personalized guidance on your energy storage projects
            </p>
          </div>
          
          {/* Expert Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white p-6 rounded-xl shadow-lg card-hover">
                <div className="text-center">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4"
                    style={{ borderColor: `${expert.color}33` }}
                  />
                  <h3 className="font-bold mb-2">{expert.name}</h3>
                  <p 
                    className="font-medium text-sm mb-2"
                    style={{ color: expert.color }}
                  >
                    {expert.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{expert.experience}</p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(expert.rating)].map((_, i) => (
                      <i key={i} className="fa fa-star text-yellow-400"></i>
                    ))}
                  </div>
                  <button 
                    className="w-full text-white py-2 px-4 rounded-lg text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: expert.color }}
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Inquiry Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Quick Consultation Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
                />
              </div>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company/Organization"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
              />
              <select 
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
              >
                <option value="">Select Consultation Type</option>
                <option value="system-design">System Design</option>
                <option value="technology-selection">Technology Selection</option>
                <option value="integration">Grid Integration</option>
                <option value="safety-compliance">Safety & Compliance</option>
                <option value="financial-analysis">Financial Analysis</option>
                <option value="other">Other</option>
              </select>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your project or questions..." 
                rows={4} 
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all resize-none"
              ></textarea>
              <button 
                type="submit" 
                disabled={consultationMutation.isPending}
                className="w-full bg-gradient-to-r from-[#165DFF] to-[#165DFF]/80 hover:from-[#165DFF]/90 hover:to-[#165DFF]/70 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#165DFF]/30 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {consultationMutation.isPending ? "Submitting..." : "Request Consultation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
