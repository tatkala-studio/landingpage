"use client";

import { Palette, Code, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Palette,
    title: "Brand Design",
    description: "Visual identity that speaks",
    color: "amber"
  },
  {
    icon: Code,
    title: "Digital Craft",
    description: "Web experiences that engage",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Strategy",
    description: "Creative direction that drives",
    color: "purple"
  }
];

export function ServicesSection() {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to highlighted card
  useEffect(() => {
    if (containerRef.current && cardRefs.current[highlightedIndex]) {
      const container = containerRef.current;
      const card = cardRefs.current[highlightedIndex];
      
      if (card) {
        const cardTop = card.offsetTop;
        const containerTop = container.offsetTop;
        const containerPadding = 24; // p-6 = 24px
        
        container.scrollTo({
          top: cardTop - containerTop - containerPadding,
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-full flex flex-col rounded-3xl bg-zinc-950/80 border border-zinc-800/50 backdrop-blur-xl overflow-hidden"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex-shrink-0 p-6 pb-4"
      >
        <h2 className="text-xl lg:text-2xl text-white">
          Our Services
        </h2>
      </motion.div>
      
      {/* Cards container - scrollable */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'none', scrollbarColor: '#3f3f46 transparent' }}
      >
        <div className="space-y-4 px-6 pb-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHighlighted = index === highlightedIndex;
            
            return (
              <motion.div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + (index * 0.1), 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className={`rounded-xl border p-4 transition-all duration-500 ${
                  isHighlighted
                    ? service.color === 'amber'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : service.color === 'blue'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-purple-500/10 border-purple-500/30'
                    : 'bg-zinc-900/50 border-zinc-800/50'
                } ${isHighlighted ? 'shadow-lg shadow-black/20' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{
                      scale: isHighlighted ? 1.1 : 1,
                      rotate: isHighlighted ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      isHighlighted ? 'bg-white/5' : 'bg-zinc-800/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${
                      isHighlighted
                        ? service.color === 'amber'
                          ? 'text-amber-400'
                          : service.color === 'blue'
                          ? 'text-blue-400'
                          : 'text-purple-400'
                        : 'text-zinc-400'
                    }`} />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium mb-0.5 truncate ${
                      isHighlighted ? 'text-white' : 'text-zinc-300'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm truncate ${
                      isHighlighted ? 'text-zinc-300' : 'text-zinc-500'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Animated indicator for highlighted card */}
                  {isHighlighted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex-shrink-0 ml-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 animate-pulse"></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtle animated gradient background */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-30"
      />
    </motion.div>
  );
}