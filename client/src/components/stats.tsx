import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: number;
  label: string;
  description: string;
  color: string;
}

function StatItem({ value, label, description, color }: StatItemProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        setCurrentValue(Math.min(Math.floor(increment * step), value));
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div 
      ref={elementRef}
      className={`text-center p-8 rounded-2xl card-hover`}
      style={{ background: `linear-gradient(135deg, ${color}05 0%, ${color}10 100%)` }}
    >
      <div 
        className="text-4xl md:text-5xl font-bold mb-3"
        style={{ color }}
      >
        {currentValue.toLocaleString()}+
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      value: 350,
      label: "Expert Articles",
      description: "Technical insights & research",
      color: "#165DFF",
    },
    {
      value: 12000,
      label: "Active Readers",
      description: "Industry professionals",
      color: "#36D399",
    },
    {
      value: 85,
      label: "BESS Experts",
      description: "Available for consultation",
      color: "#8B5CF6",
    },
    {
      value: 500,
      label: "Projects Supported",
      description: "Successful implementations",
      color: "#F59E0B",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
