"use client";

import { motion } from "framer-motion";

export function FreshElements() {
  return (
    <>
      {/* Floating blobs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30"
      />
      
      {/* Wave line */}
      <svg className="absolute bottom-0 left-0 w-full h-20 opacity-10" viewBox="0 0 1200 120">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
          fill="currentColor" 
          className="text-cyan-500"
        />
      </svg>
    </>
  );
}