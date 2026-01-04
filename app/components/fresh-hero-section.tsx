"use client";

import { ArrowRight, Instagram, Youtube, Sparkles, Palette, Zap, Sun, Moon } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FreshHeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Social media links
  const socialMediaLinks = {
    instagram: "https://instagram.com/tatkalastudio",
    youtube: "https://youtube.com/@tatkalastudio",
    tiktok: "https://tiktok.com/@tatkalastudio"
  };

  // Fresh color palette
  const freshColors = {
    dark: {
      bg: "from-slate-900 via-indigo-950 to-emerald-950",
      gradient: "from-cyan-500/20 via-purple-500/10 to-emerald-500/20",
      glass: "bg-white/[0.03]",
      badge: "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30",
      heading: "bg-gradient-to-r from-cyan-300 via-purple-300 to-emerald-300",
      text: "text-slate-300",
      accentText: "text-cyan-300",
      button: "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500",
      social: "bg-white/10 border-white/20 hover:bg-white/15",
      toggle: "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30"
    },
    light: {
      bg: "from-cyan-50 via-white to-purple-50",
      gradient: "from-cyan-500/20 via-purple-500/10 to-emerald-500/10",
      glass: "bg-white/[0.4]",
      badge: "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/40",
      heading: "bg-gradient-to-r from-cyan-600 via-purple-600 to-emerald-600",
      text: "text-slate-700",
      accentText: "text-cyan-600",
      button: "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400",
      social: "bg-slate-800/10 border-slate-300/30 hover:bg-slate-800/15",
      toggle: "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/40"
    }
  };

  const colors = isDarkMode ? freshColors.dark : freshColors.light;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-full overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
          isDarkMode 
            ? 'border-slate-800/30' 
            : 'border-slate-200/50'
        }`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
        
        {/* Animated gradient overlay */}
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className={`absolute inset-0 bg-gradient-to-tr ${colors.gradient} opacity-50`}
        />
        
        {/* Floating particles */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute w-${i * 2} h-${i * 2} rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400/20' : 
              i % 3 === 1 ? 'bg-purple-400/20' : 'bg-emerald-400/20'
            } blur-sm`}
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${10 + (i * 15)}%`,
            }}
          />
        ))}
        
        {/* Glass effect */}
        <div className={`absolute inset-0 backdrop-blur-3xl ${colors.glass}`} />
        
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`absolute top-4 right-4 z-20 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${colors.toggle}`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-cyan-300" />
          ) : (
            <Moon className="w-5 h-5 text-cyan-600" />
          )}
        </motion.button>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 lg:p-8 z-10">
          {/* Top section */}
          <div className="max-w-full">
            {/* Creative badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full backdrop-blur-md border ${colors.badge}`}
            >
              <Palette className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-medium text-white">Creative Studio</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse"></div>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight bg-clip-text text-transparent ${colors.heading}`}
            >
              Tatkala
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 font-light">
                Where Modern Aesthetic Meets Emotional Storytelling
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-lg md:text-xl mb-8 max-w-2xl leading-relaxed ${colors.text}`}
            >
              We craft <span className="font-semibold text-cyan-400">digital experiences</span> that resonate deeply, 
              blending <span className="font-semibold text-purple-400">modern aesthetics</span> with 
              <span className="font-semibold text-emerald-400"> emotional storytelling</span>.
            </motion.p>
          </div>
          
          {/* Bottom section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* CTA Button */}
            <motion.button 
              onClick={openAboutModal}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-500 text-white shadow-lg ${colors.button}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </motion.button>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, color: "from-pink-500 to-rose-500", label: "Instagram" },
                { icon: Youtube, color: "from-red-500 to-orange-500", label: "YouTube" },
                { icon: FaTiktok, color: "from-cyan-500 to-purple-500", label: "TikTok" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={socialMediaLinks[social.label.toLowerCase() as keyof typeof socialMediaLinks]}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${colors.social}`}
                  aria-label={social.label}
                >
                  <social.icon className={`w-5 h-5 ${
                    isDarkMode 
                      ? `text-${social.color.split('-')[1]}-300` 
                      : `text-${social.color.split('-')[1]}-600`
                  }`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Floating blobs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20' 
              : 'bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30'
          }`}
        />
        
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-10 left-10 w-48 h-48 rounded-full blur-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20' 
              : 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30'
          }`}
        />
      </motion.div>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
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
              className={`absolute inset-0 backdrop-blur-xl ${
                isDarkMode ? 'bg-slate-950/90' : 'bg-white/95'
              }`}
              onClick={closeAboutModal}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border-2 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-cyan-900/20 border-slate-800/50' 
                  : 'bg-gradient-to-br from-white/90 via-purple-50/30 to-cyan-50/30 border-slate-200/70'
              }`}
            >
              {/* Modal content */}
              <div className="relative p-8">
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  onClick={closeAboutModal}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-300' 
                      : 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/40 text-cyan-600'
                  } border`}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.button>
                
                {/* Modal header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className={`text-3xl font-bold mb-2 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>
                    About Tatkala Studio
                  </h2>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Crafting digital experiences that stand the test of time
                  </p>
                </motion.div>
                
                {/* Modal body */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      Our Philosophy
                    </h3>
                    <p className={`leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      We believe in the power of storytelling through visual language. Every project is an opportunity to create meaning, evoke emotion, and build lasting connections with audiences worldwide.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      What We Do
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Brand Strategy & Identity",
                        "Digital Product Design",
                        "Web Development",
                        "Content Creation",
                        "Motion Graphics",
                        "User Experience Design"
                      ].map((service, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                            isDarkMode 
                              ? 'bg-slate-800/50 border border-slate-700/50' 
                              : 'bg-slate-100/50 border border-slate-200/50'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            idx % 3 === 0 ? 'bg-cyan-500' : 
                            idx % 3 === 1 ? 'bg-purple-500' : 'bg-emerald-500'
                          }`} />
                          <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* CTA button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={closeAboutModal}
                  className={`mt-8 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white' 
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white'
                  }`}
                >
                  Start Your Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}