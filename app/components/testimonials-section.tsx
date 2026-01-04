"use client";

import { useState, useEffect, useRef } from "react";
import { Quote, X, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Tatkala transformed our brand with elegance and precision. Truly exceptional work.",
    author: "Sarah Chen",
    role: "Creative Director"
  },
  {
    id: 2,
    quote: "A rare blend of artistry and strategy. They understood our vision perfectly.",
    author: "Marcus Webb",
    role: "Founder, Studio X"
  },
  {
    id: 3,
    quote: "The attention to detail and creative approach resulted in a stunning visual identity.",
    author: "Lisa Park",
    role: "Marketing Director"
  },
  {
    id: 4,
    quote: "Working with Tatkala was transformative. They delivered beyond our expectations.",
    author: "Alex Rivera",
    role: "Product Manager"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAnimating, setModalAnimating] = useState(false);
  
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide function
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    
    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      stopAutoSlide();
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const openModal = (id: number) => {
    setSelectedTestimonial(id);
    setModalAnimating(true);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    stopAutoSlide();
    
    setTimeout(() => {
      setModalAnimating(false);
    }, 10);
  };

  const closeModal = () => {
    setModalAnimating(true);
    
    setTimeout(() => {
      setModalOpen(false);
      setSelectedTestimonial(null);
      setModalAnimating(false);
      document.body.style.overflow = 'unset';
      startAutoSlide();
    }, 300);
  };

  const getCurrentTestimonial = () => {
    return testimonials.find(t => t.id === selectedTestimonial);
  };

  const nextTestimonial = () => {
    if (selectedTestimonial === null) return;
    const currentIndex = testimonials.findIndex(t => t.id === selectedTestimonial);
    const nextIndex = (currentIndex + 1) % testimonials.length;
    setSelectedTestimonial(testimonials[nextIndex].id);
  };

  const prevTestimonial = () => {
    if (selectedTestimonial === null) return;
    const currentIndex = testimonials.findIndex(t => t.id === selectedTestimonial);
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    setSelectedTestimonial(testimonials[prevIndex].id);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      {/* SECTION UTAMA - Slider dengan Single Card */}
      <div 
        className="relative h-full overflow-hidden rounded-3xl bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-xl"
        style={{
          animation: 'slideInFromLeft 0.8s ease-out forwards',
          opacity: 0,
          transform: 'translateX(-30px)'
        }}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {/* Glassmorphism layer */}
        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.03] to-transparent"></div>
        
        <div className="relative h-full flex flex-col p-6 lg:p-8 z-10">
          {/* Header dengan Dots Indicator - REDUCED MARGIN */}
          <div 
            className="flex items-center justify-between mb-3" // Changed from mb-6 to mb-3
            style={{
              animation: 'slideInFromLeft 0.8s ease-out 0.2s forwards',
              opacity: 0,
              transform: 'translateX(-20px)'
            }}
          >
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-amber-400/60" />
              <h2 className="text-xl lg:text-2xl text-white">
                Testimonials
              </h2>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-6 h-2 bg-amber-400'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Single Testimonial Card Slider - ADJUSTED SPACING */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div 
                key={currentTestimonial.id}
                className={`transition-all duration-500 w-full ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
              >
                <button
                  onClick={() => openModal(currentTestimonial.id)}
                  className="w-full h-full text-left p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 group"
                >
                  <p className="text-zinc-300 text-sm mb-3 leading-relaxed line-clamp-4"> {/* Reduced mb-4 to mb-3 */}
                    "{currentTestimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-zinc-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-sm text-amber-400">{currentTestimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm">{currentTestimonial.author}</p>
                      <p className="text-zinc-500 text-xs">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Simple Counter - ADJUSTED MARGIN */}
            <div className="text-center mt-3"> {/* Reduced from mt-4 to mt-3 */}
              <p className="text-zinc-400 text-sm">
                <span className="text-white font-medium">{currentIndex + 1}</span>
                <span className="text-zinc-600 mx-1">/</span>
                <span>{testimonials.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL - Animasi fade in */}
      {(modalOpen || modalAnimating) && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalAnimating ? 'modal-closing' : ''}`}
          style={{
            animation: modalAnimating && !modalOpen ? 'fadeOut 0.3s ease-in forwards' : 'fadeIn 0.3s ease-out forwards',
            opacity: modalAnimating && !modalOpen ? 1 : 0
          }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={closeModal}
          />
          
          {/* Modal content */}
          <div 
            className="relative w-full max-w-2xl rounded-3xl bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-xl overflow-hidden modal-content"
            style={{
              animation: modalAnimating && !modalOpen ? 'scaleOut 0.3s ease-in forwards' : 'scaleIn 0.3s ease-out forwards',
              transform: modalAnimating && !modalOpen ? 'scale(1)' : 'scale(0.9)',
              opacity: modalAnimating && !modalOpen ? 1 : 0
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              style={{
                animation: 'slideInFromRight 0.5s ease-out 0.2s forwards',
                opacity: 0,
                transform: 'translateX(20px)'
              }}
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Modal content */}
            <div className="p-8 lg:p-12">
              <div 
                className="flex items-center gap-2 mb-6"
                style={{
                  animation: 'slideInFromLeft 0.5s ease-out 0.1s forwards',
                  opacity: 0,
                  transform: 'translateX(-20px)'
                }}
              >
                <Quote className="w-8 h-8 text-amber-400/60" />
                <h2 className="text-2xl lg:text-3xl text-white">
                  Client Testimonial
                </h2>
              </div>
              
              {(() => {
                const testimonial = getCurrentTestimonial();
                if (!testimonial) return null;
                
                return (
                  <>
                    <div 
                      className="mb-8"
                      style={{
                        animation: 'fadeIn 0.5s ease-out 0.2s forwards',
                        opacity: 0
                      }}
                    >
                      <p className="text-xl lg:text-2xl text-zinc-300 italic leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/30 to-zinc-500/30 border border-white/10 flex items-center justify-center">
                          <span className="text-xl text-amber-400 font-bold">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-xl font-medium">{testimonial.author}</p>
                          <p className="text-zinc-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation with page number in the center */}
                    <div 
                      className="flex items-center justify-center gap-6 pt-6 border-t border-zinc-800/50"
                      style={{
                        animation: 'fadeIn 0.5s ease-out 0.3s forwards',
                        opacity: 0
                      }}
                    >
                      <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      
                      {/* Testimonial counter */}
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <span className="text-white font-medium">{testimonial.id}</span>
                        <span className="text-zinc-500">/</span>
                        <span className="text-zinc-500">{testimonials.length}</span>
                      </div>
                      
                      <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-xl translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        /* Hide scrollbar when modal is open */
        body:has(.fixed.inset-0.z-50) {
          overflow: hidden !important;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .modal-content::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .modal-content {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Ensure no overflow in modal */
        .fixed.inset-0.z-50 {
          overflow: hidden;
        }

        .fixed.inset-0.z-50 > div:first-child {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}