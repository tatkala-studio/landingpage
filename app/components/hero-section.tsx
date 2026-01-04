"use client";

import { ArrowRight, Instagram, Youtube, Sparkles, X, MapPin, Calendar, Users, Award, User } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Simple mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const socialMediaLinks = {
    instagram: "https://instagram.com/by.tatkala",
    youtube: "https://youtube.com/@yourchannel",
    tiktok: "https://tiktok.com/@yourusername"
  };

  const ownerInfo = {
    name: "Reza Velayani",
    position: "Founder & Creative Director",
    bio: "5+ years of experience in system development, website development, and digital design. Currently focused on helping businesses build functional and consistent digital solutions.",
    image: "/favicon.ico",
    location: "Mataram, NTB, Indonesia",
    founded: "2020",
    teamSize: "12+ Members",
    awards: "15+ Awards"
  };

  const brandInfo = {
    name: "Tatkala Studio",
    tagline: "Where Modern Aesthetic Meets Emotional Storytelling",
    description: "Tatkala Studio is a creative and digital studio that helps businesses build relevant identities, experiences, and digital solutions. Our services include branding, visual design, website development, digital systems, LMS, and photo and video content.",
    philosophy: "Designs must be aesthetically pleasing, functional, and relevant to business objectives. We ensure that every outcome has real value and impact.",
    services: ["Brand Strategy", "Digital Design", "Web Development", "Content Creation"],
    clients: ["Tech Startups", "Lifestyle Brands", "Creative Agencies", "E-commerce"]
  };

  // Debounced open modal function - SOLUSI UTAMA
  const openAboutModal = () => {
    if (isOpeningModal) return;
    
    setIsOpeningModal(true);
    setIsAboutModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    if (onExploreClick) onExploreClick();
    
    // Reset flag setelah 300ms
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }
    
    modalTimerRef.current = setTimeout(() => {
      setIsOpeningModal(false);
    }, 300);
  };

  // Simple close modal function
  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    document.body.style.overflow = 'unset';
    
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }
    setIsOpeningModal(false);
  };

  // Handler untuk tombol explore - HANYA SATU HANDLER
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAboutModal();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAboutModal();
    };
    
    if (isAboutModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }
    };
  }, [isAboutModalOpen]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
        className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800/50 backdrop-blur-xl group"
      >
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-amber-800/5 to-zinc-900/20 opacity-50"
          style={{
            backgroundSize: "400% 400%",
          }}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-zinc-500/5 opacity-30"></div>
        
        {/* Refined glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-white/[0.01] backdrop-blur-3xl"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 lg:p-8 z-10">
          <div className="max-w-full">
            {/* Enhanced Creative Studio Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-gradient-to-r from-white/5 to-white/2 border border-white/10 backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 animate-pulse"></div>
              <span className="text-xs font-medium tracking-wider text-zinc-300 uppercase">
                Creative Studio
              </span>
            </motion.div>
            
            {/* Enhanced Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                <span className="font-light tracking-tight text-white">
                  Tatkala Studio
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 font-normal tracking-wide text-zinc-400">
                  Where Appearance Meets
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 font-medium bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  With Satisfaction
                </span>
              </h1>
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl mb-8 max-w-lg leading-relaxed text-zinc-400 font-light tracking-wide"
            >
              We design immersive digital stories that not only captivate but also create lasting emotional connections.
            </motion.p>
          </div>
          
          {/* Enhanced CTA Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Enhanced Explore Button - HANYA ONCLICK */}
            <motion.button 
              type="button"
              onClick={handleExploreClick}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative overflow-hidden px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 border border-amber-500/40 backdrop-blur-md transition-all duration-500 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 hover:border-amber-400/50 shadow-lg shadow-amber-500/10 select-none"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              disabled={isOpeningModal}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Button content */}
              <div className="relative flex items-center gap-3">
                <span className="text-sm font-medium text-white tracking-wide">
                  <span className={isOpeningModal ? "opacity-50" : ""}>
                    {isOpeningModal ? "Opening..." : "Get to Know Us Better"}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
            
            {/* Enhanced Social Links */}
            <div className="flex items-center gap-2">
              <motion.a 
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/instagram w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-300"
                aria-label="Instagram"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Instagram className="w-4 h-4 text-white group-hover/instagram:text-amber-300 transition-colors duration-300" />
              </motion.a>
              
              <motion.a 
                href={socialMediaLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/youtube w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-300"
                aria-label="YouTube"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Youtube className="w-4 h-4 text-white group-hover/youtube:text-amber-300 transition-colors duration-300" />
              </motion.a>
              
              <motion.a 
                href={socialMediaLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/tiktok w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-300"
                aria-label="TikTok"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <FaTiktok className="w-3.5 h-3.5 text-white group-hover/tiktok:text-amber-300 transition-colors duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Ambient Glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="absolute top-10 -left-10 w-24 h-24 bg-gradient-to-r from-amber-500/5 to-amber-600/5 rounded-full blur-3xl opacity-15"></div>
      </motion.div>

      {/* About Modal - Simplified */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            {/* Backdrop dengan satu handler */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
                onMouseDown={closeAboutModal}
                onTouchStart={closeAboutModal}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-xl overflow-hidden flex flex-col"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
                onClick={closeAboutModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Modal Header */}
              <div className="p-4 lg:p-6 border-b border-zinc-800/50 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-zinc-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-medium text-white tracking-tight">
                      {brandInfo.name}
                    </h2>
                    <p className="text-amber-400 text-xs lg:text-sm tracking-wide">
                      {brandInfo.tagline}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Owner Info - Left Column */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1 space-y-6"
                  >
                    {/* Owner Photo */}
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-zinc-500/10 flex items-center justify-center">
                        {imageError ? (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <User className="w-16 h-16 text-amber-400/50" />
                            <span className="text-amber-400/50 text-xs mt-2">Owner Photo</span>
                          </div>
                        ) : (
                          <img 
                            src={ownerInfo.image}
                            alt={ownerInfo.name}
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Owner Details */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-white">{ownerInfo.name}</h3>
                        <p className="text-amber-400 text-sm mt-1">{ownerInfo.position}</p>
                      </div>
                      
                      <p className="text-zinc-400 text-xs text-center leading-relaxed tracking-wide">
                        {ownerInfo.bio}
                      </p>
                      
                      {/* Owner Stats */}
                      <div className="space-y-2 pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-zinc-300 text-xs">{ownerInfo.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-zinc-300 text-xs">Founded in {ownerInfo.founded}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Brand Info - Right Column */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 space-y-6"
                  >
                    {/* Brand Description */}
                    <div>
                      <h3 className="text-base font-medium text-white mb-3 tracking-tight">Our Story</h3>
                      <div className="space-y-3">
                        <p className="text-zinc-400 text-sm leading-relaxed tracking-wide">
                          {brandInfo.description}
                        </p>
                        <p className="text-zinc-400 text-sm leading-relaxed tracking-wide">
                          {brandInfo.philosophy}
                        </p>
                      </div>
                    </div>
                    
                    {/* Services and Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* What We Do */}
                      <div>
                        <h3 className="text-base font-medium text-white mb-3 tracking-tight">What We Do</h3>
                        <div className="space-y-2">
                          {brandInfo.services.map((service, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + (index * 0.1) }}
                              className="px-3 py-2 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300"></div>
                                <span className="text-zinc-300 text-sm tracking-wide">{service}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div>
                        <h3 className="text-base font-medium text-white mb-3 tracking-tight">Our Achievements</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center p-2.5 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <div className="flex items-center justify-center gap-1 mb-1.5">
                              <Users className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="text-sm font-medium text-white">{ownerInfo.teamSize}</div>
                            <div className="text-[10px] text-zinc-400 tracking-wide">Team</div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center p-2.5 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <div className="flex items-center justify-center gap-1 mb-1.5">
                              <Award className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="text-sm font-medium text-white">{ownerInfo.awards}</div>
                            <div className="text-[10px] text-zinc-400 tracking-wide">Awards</div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center p-2.5 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <div className="flex items-center justify-center gap-1 mb-1.5">
                              <Calendar className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="text-sm font-medium text-white">50+</div>
                            <div className="text-[10px] text-zinc-400 tracking-wide">Projects</div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-center p-2.5 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <div className="flex items-center justify-center gap-1 mb-1.5">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="text-sm font-medium text-white">100%</div>
                            <div className="text-[10px] text-zinc-400 tracking-wide">Satisfaction</div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-3 lg:p-4 border-t border-zinc-800/50 flex-shrink-0"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] lg:text-xs text-zinc-500 tracking-wide">
                    Creating meaningful digital experiences since {ownerInfo.founded}
                  </div>
                  <button 
                    onClick={closeAboutModal}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full transition-all duration-300 hover:scale-105 text-xs font-medium shadow-md shadow-amber-500/10"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="text-white">Contact Us</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}