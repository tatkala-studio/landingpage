"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Minimal Space"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1703936205356-11814e31bfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Abstract Form"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1659095012540-8269e6fef69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Editorial Vision"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Luxury Detail"
  }
];

export function PortfolioSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      }
      
      if (e.key === 'ArrowRight') {
        nextSlide();
      }
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-full overflow-hidden rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl"
      >
        {/* Enhanced glassmorphism for portfolio */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-white/[0.02]"></div>
        
        <div className="relative h-full flex flex-col p-6 lg:p-8 z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl lg:text-2xl text-white mb-4"
          >
            Selected Work
          </motion.h2>
          
          {/* Grid 4 images horizontal */}
          <div className="flex-1 flex gap-3">
            {portfolioItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.3 + (index * 0.1), 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(index)}
                className="flex-1 group/portfolio relative overflow-hidden rounded-2xl bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover/portfolio:opacity-100 transition-all duration-500"
                  />
                </motion.div>
                
                {/* Overlay on hover */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                >
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm">{item.title}</p>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
            
            {/* Navigation arrows */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
            
            {/* Image container */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src={portfolioItems[currentIndex].image}
                  alt={portfolioItems[currentIndex].title}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              {/* Image title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <p className="text-white text-lg">{portfolioItems[currentIndex].title}</p>
              </motion.div>
              
              {/* Image counter */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-6 text-white text-sm"
              >
                {currentIndex + 1} / {portfolioItems.length}
              </motion.div>
            </motion.div>
            
            {/* Click outside to close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10" 
              onClick={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}