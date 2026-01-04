"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export function CtaSection() {
  const [selectedOption, setSelectedOption] = useState<'email' | 'call'>('email');

  const handleOptionSelect = (option: 'email' | 'call') => {
    setSelectedOption(option);
    
    if (option === 'email') {
      window.location.href = 'mailto:tatkalavara@gmail.com';
    } else {
      window.location.href = 'tel:+6281234567890';
    }
  };

  return (
    <div 
      className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 border border-zinc-800/50 backdrop-blur-xl"
      style={{
        animation: 'slideInFromLeft 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateX(-30px)'
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="relative h-full flex flex-col p-4 lg:p-6 z-10">
        {/* Header Section */}
        <div 
          className="mb-4 lg:mb-6 flex-shrink-0"
          style={{
            animation: 'slideInFromLeft 0.8s ease-out 0.2s forwards',
            opacity: 0,
            transform: 'translateX(-20px)'
          }}
        >
          <h2 className="text-lg lg:text-xl text-white mb-2">
            Let's Create Together
          </h2>
          <p className="text-zinc-400 text-xs lg:text-sm leading-relaxed">
            Ready to bring your vision to life? Contact us to start your project.
          </p>
        </div>
        
        {/* Middle spacer - flex-grow to push button down */}
        <div className="flex-1"></div>
        
        {/* Dual Contact Buttons - Horizontal Layout */}
        <div 
          className="relative flex-shrink-0"
          style={{
            animation: 'slideInFromLeft 0.8s ease-out 0.4s forwards',
            opacity: 0,
            transform: 'translateX(-20px)'
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Email Button - HORIZONTAL LAYOUT */}
            <button
              onClick={() => handleOptionSelect('email')}
              className={`w-full px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                selectedOption === 'email' 
                  ? 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedOption === 'email' 
                  ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30' 
                  : 'bg-white/10 border border-white/20'
              }`}>
                <Mail className={`w-4 h-4 ${
                  selectedOption === 'email' ? 'text-amber-400' : 'text-zinc-400'
                }`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className={`text-xs font-medium truncate ${
                  selectedOption === 'email' ? 'text-amber-400' : 'text-white'
                }`}>
                  Email
                </div>
                <div className={`text-[9px] truncate ${
                  selectedOption === 'email' ? 'text-amber-400/80' : 'text-zinc-500'
                }`}>
                  tatkalavara@gmail.com
                </div>
              </div>
              {selectedOption === 'email' && (
                <div className="flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              )}
            </button>
            
            {/* Call Button - HORIZONTAL LAYOUT */}
            <button
              onClick={() => handleOptionSelect('call')}
              className={`w-full px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                selectedOption === 'call' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedOption === 'call' 
                  ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30' 
                  : 'bg-white/10 border border-white/20'
              }`}>
                <Phone className={`w-4 h-4 ${
                  selectedOption === 'call' ? 'text-blue-400' : 'text-zinc-400'
                }`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className={`text-xs font-medium truncate ${
                  selectedOption === 'call' ? 'text-blue-400' : 'text-white'
                }`}>
                  Call
                </div>
                <div className={`text-[9px] truncate ${
                  selectedOption === 'call' ? 'text-blue-400/80' : 'text-zinc-500'
                }`}>
                  +62 812-3456-7890
                </div>
              </div>
              {selectedOption === 'call' && (
                <div className="flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              )}
            </button>
          </div>
          
          {/* Quick Info */}
          <div className="mt-3 flex items-center justify-center text-[10px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse"></div>
              <span>Available 24/7 • Response within 2 hours</span>
            </div>
          </div>
        </div>
        
        {/* Optional footer info - compact version */}
        <div 
          className="mt-3 pt-2 border-t border-zinc-800/50 flex-shrink-0"
          style={{
            animation: 'slideInFromLeft 0.8s ease-out 0.5s forwards',
            opacity: 0,
            transform: 'translateX(-20px)'
          }}
        >
          {/* Footer info kosong - bisa diisi jika diperlukan */}
        </div>
      </div>
    </div>
  );
}