"use client";

import { Sparkles, X, MapPin, Calendar, Users, Award, ArrowRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hapus openModal dari interface karena kita tidak mengirimnya dari parent
interface AboutSectionProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export function AboutSection({ isModalOpen, closeModal }: AboutSectionProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const ownerInfo = {
    name: "Reza Velayani",
    position: "Founder & Creative Director",
    bio: "With over 8 years of experience in digital design and brand strategy, Alexandra leads Tatkala with a vision to create meaningful digital experiences that resonate emotionally.",
    image: "/favicon.ico",
    location: "Mataram, NTB, Indonesia",
    founded: "2020",
    teamSize: "12+ Members",
    awards: "15+ Awards"
  };

  const brandInfo = {
    name: "Tatkala Studio",
    tagline: "Where Modern Aesthetic Meets Emotional Storytelling",
    description: "We are a design studio that believes in the power of storytelling through visual language. Every project is an opportunity to create meaning, evoke emotion, and build lasting connections with audiences worldwide.",
    philosophy: "Our philosophy centers on the intersection of beauty and purpose. We believe that design should not only look exceptional but also serve a meaningful function and tell a compelling story.",
    services: ["Brand Strategy", "Digital Design", "Web Development", "Content Creation"],
    clients: ["Tech Startups", "Lifestyle Brands", "Creative Agencies", "E-commerce"]
  };

  return (
    <>
      {/* About Card - Clickable */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-full overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-xl group hover:border-zinc-700/50 transition-all duration-500"
      >
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"></div>
        
        <div className="relative h-full w-full flex flex-col p-6 lg:p-8 z-10">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-zinc-500/20 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl text-white">
                About Tatkala
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-zinc-400 leading-relaxed text-sm lg:text-base line-clamp-4"
            >
              We are a design studio that believes in the power of storytelling. 
              Every project is an opportunity to create meaning and evoke emotion.
            </motion.p>
          </div>
          
          {/* Learn more button at bottom right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-auto pt-6 flex justify-end w-full"
          >
            <div className="inline-flex items-center gap-2 text-amber-400/70 text-sm border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 rounded-full">
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </motion.div>

      {/* Modal untuk About Section - sisanya tetap sama ... */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={closeModal}
            />
            
            {/* Modal Content - sisa kode modal tetap sama */}
            {/* ... */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(245, 158, 11, 0.3) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </>
  );
}