"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette, Code, Zap, Briefcase, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Data untuk tab Services
const servicesData = [
  {
    icon: Palette,
    title: "Brand Design",
    description: "Complete visual identity systems that tell your brand's unique story",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Print Collateral"],
    color: "amber"
  },
  {
    icon: Code,
    title: "Digital Craft",
    description: "Immersive web experiences that engage and convert",
    features: ["Website Design", "UI/UX Design", "Web Development", "E-commerce"],
    color: "blue"
  },
  {
    icon: Zap,
    title: "Creative Strategy",
    description: "Data-driven creative direction that drives business results",
    features: ["Brand Strategy", "Content Strategy", "Marketing Campaigns", "User Research"],
    color: "purple"
  },
  {
    icon: Briefcase,
    title: "Content Creation",
    description: "Visual content that captivates and communicates",
    features: ["Photography", "Videography", "Social Media Content", "Motion Graphics"],
    color: "emerald"
  }
];

// Data untuk tab Work
const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Minimal Space",
    category: "Brand Identity",
    description: "Complete rebranding for a minimalist furniture company with focus on clean aesthetics",
    year: "2023"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1703936205356-11814e31bfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Abstract Form",
    category: "Web Design",
    description: "Interactive website for an art gallery featuring modern abstract artists",
    year: "2023"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1659095012540-8269e6fef69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Editorial Vision",
    category: "Print Design",
    description: "Editorial design for a fashion magazine with bold typography and layout",
    year: "2022"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Luxury Detail",
    category: "Brand Identity",
    description: "Premium brand identity for a luxury watchmaker with attention to detail",
    year: "2022"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Digital Transformation",
    category: "Web Development",
    description: "Complete digital transformation for a traditional retail business",
    year: "2024"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1628746406382-8d7c0d2d5a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Custom e-commerce platform with advanced features and seamless user experience",
    year: "2023"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Mobile App Design",
    category: "UI/UX Design",
    description: "Intuitive mobile application design for a fintech startup",
    year: "2024"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    title: "Corporate Identity",
    category: "Brand Identity",
    description: "Complete corporate identity package for a multinational corporation",
    year: "2023"
  }
];

type TabType = 'work' | 'services';

// Komponen Pagination yang terpisah
function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-zinc-800/50 bg-zinc-950/50 z-10">
      <div className="text-xs text-zinc-400">
        Showing {startIndex + 1}-{endIndex} of {totalItems} projects
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 flex items-center gap-1 ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed bg-zinc-800/30 text-zinc-500'
              : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm transition-all duration-300 ${
                currentPage === page
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                  : 'bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/50 hover:text-white active:scale-95'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 flex items-center gap-1 ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed bg-zinc-800/30 text-zinc-500'
              : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white active:scale-95'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function WorkServiceSection() {
  const [activeTab, setActiveTab] = useState<TabType>('work');
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(null);
  const [highlightedService, setHighlightedService] = useState(0);
  const [currentWorkPage, setCurrentWorkPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Auto rotate highlight for services
  useEffect(() => {
    if (activeTab === 'services') {
      const interval = setInterval(() => {
        setHighlightedService((prev) => (prev + 1) % servicesData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Reset to page 1 when switching tabs
  useEffect(() => {
    if (activeTab === 'work') {
      setCurrentWorkPage(1);
    }
  }, [activeTab]);

  const openWorkModal = useCallback((index: number) => {
    setSelectedWorkIndex(index);
  }, []);

  const closeWorkModal = () => {
    setSelectedWorkIndex(null);
  };

  const nextWork = () => {
    if (selectedWorkIndex !== null) {
      setSelectedWorkIndex((prev) => 
        prev === portfolioItems.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const prevWork = () => {
    if (selectedWorkIndex !== null) {
      setSelectedWorkIndex((prev) => 
        prev === 0 ? portfolioItems.length - 1 : prev! - 1
      );
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);
  const startIndex = (currentWorkPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkItems = portfolioItems.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
    setCurrentWorkPage(page);
    // Scroll to top of content area when page changes
    const contentArea = document.querySelector('.work-content-scroll');
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-full flex flex-col rounded-3xl bg-zinc-950/80 border border-zinc-800/50 backdrop-blur-xl overflow-hidden"
      >
        {/* Header with Tabs - MEMPERKECIL SPASI DARI mb-6 MENJADI mb-4 */}
        <div className="flex-shrink-0 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl lg:text-2xl text-white">
              {activeTab === 'work' ? 'Our Craft in Focus' : 'Our Creative Services'}
            </h2>
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 bg-zinc-900/50 rounded-full p-1 border border-zinc-800/50">
              <button
                onClick={() => setActiveTab('work')}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeTab === 'work'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeTab === 'services'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Services
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - MENGHAPUS pt-2 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar work-content-scroll">
          <div className="px-6 lg:px-8 pb-4">
            <AnimatePresence mode="wait">
              {activeTab === 'work' ? (
                // Work Tab Content - Vertical List with Pagination - MENGHAPUS pt-2
                <motion.div
                  key="work"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {currentWorkItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openWorkModal(startIndex + index)}
                      className="w-full text-left group/work overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      <div className="flex items-start gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-800/50">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/work:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-white font-medium text-sm lg:text-base truncate">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                                  {item.category}
                                </span>
                                <span className="text-xs text-zinc-500">
                                  {item.year}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          
                          <p className="text-zinc-400 text-xs lg:text-sm leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                // Services Tab Content - MENGHAPUS pt-2
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pb-6 lg:pb-8"
                >
                  {servicesData.map((service, index) => {
                    const Icon = service.icon;
                    const isHighlighted = index === highlightedService;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-xl border p-4 transition-all duration-500 ${
                          isHighlighted
                            ? service.color === 'amber'
                              ? 'bg-amber-500/10 border-amber-500/30'
                              : service.color === 'blue'
                              ? 'bg-blue-500/10 border-blue-500/30'
                              : service.color === 'purple'
                              ? 'bg-purple-500/10 border-purple-500/30'
                              : 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-zinc-900/50 border-zinc-800/50'
                        } ${isHighlighted ? 'shadow-lg shadow-black/20' : ''}`}
                      >
                        <div className="flex items-start gap-3">
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
                                  : service.color === 'purple'
                                  ? 'text-purple-400'
                                  : 'text-emerald-400'
                                : 'text-zinc-400'
                            }`} />
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className={`font-medium text-sm lg:text-base ${
                                isHighlighted ? 'text-white' : 'text-zinc-300'
                              }`}>
                                {service.title}
                              </h3>
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
                            
                            <p className={`text-xs lg:text-sm mb-3 ${
                              isHighlighted ? 'text-zinc-300' : 'text-zinc-500'
                            }`}>
                              {service.description}
                            </p>
                            
                            {/* Features */}
                            <div className="flex flex-wrap gap-1.5">
                              {service.features.map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-400"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Controls - hanya untuk tab Work */}
        {activeTab === 'work' && portfolioItems.length > itemsPerPage && (
          <PaginationControls
            currentPage={currentWorkPage}
            totalPages={totalPages}
            totalItems={portfolioItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}

        {/* Subtle animated gradient background */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-20"
        />
      </motion.div>

      {/* Work Detail Modal */}
      <AnimatePresence>
        {selectedWorkIndex !== null && (
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
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={closeWorkModal}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-xl overflow-hidden flex flex-col"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
                onClick={closeWorkModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Navigation arrows */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={prevWork}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={nextWork}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {portfolioItems[selectedWorkIndex!] && (
                  <div className="p-6 lg:p-8">
                    <div className="mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 mb-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-zinc-500/20 border border-amber-500/30 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <h2 className="text-xl lg:text-2xl text-white">
                            {portfolioItems[selectedWorkIndex!].title}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-amber-400">
                              {portfolioItems[selectedWorkIndex!].category}
                            </span>
                            <span className="text-sm text-zinc-500">•</span>
                            <span className="text-sm text-zinc-400">
                              {portfolioItems[selectedWorkIndex!].year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden border border-zinc-800/50 mb-6"
                      >
                        <ImageWithFallback
                          src={portfolioItems[selectedWorkIndex!].image}
                          alt={portfolioItems[selectedWorkIndex!].title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-lg text-white mb-3">Project Overview</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">
                          {portfolioItems[selectedWorkIndex!].description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 border-t border-zinc-800/50 flex items-center justify-between"
              >
                <div className="text-xs text-zinc-500">
                  Project {selectedWorkIndex! + 1} of {portfolioItems.length}
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full transition-all duration-300 hover:scale-105 text-sm">
                  <span className="text-white font-medium">View Case Study</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(245, 158, 11, 0.3) rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }

        /* Touch-friendly scroll for mobile */
        @media (max-width: 768px) {
          .custom-scrollbar {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </>
  );
}