import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, ChevronLeft, ChevronRight, Pause, Play, Sparkles, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Github = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  isWebsite?: boolean;
}

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock background scroll when modal is open so only the modal box scrolls
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [selectedProject]);

  useGSAP(() => {
    // Parallax background text horizontal movement
    gsap.fromTo('.parallax-bg-text-projects',
      { x: -160 },
      {
        x: 160,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      }
    );

    gsap.from('.project-carousel-wrapper', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out',
    });
  }, { scope: sectionRef });

  const projects: Project[] = [
    {
      id: 1,
      title: 'TalentSphere AI',
      subtitle: 'AI-Powered Workforce Intelligence Platform',
      description: 'Built reusable modules for employee profiles, skill tracking and project allocation; integrated secure role-based access, REST APIs, validated forms, and AI-driven resume analysis and skill matching.',
      technologies: ['React.js', 'Redux Toolkit', 'REST APIs', 'JWT', 'Axios', 'Material UI', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      features: [
        'Built reusable modules for employee profiles, skill tracking, and project allocation.',
        'Integrated secure role-based access control, JWT authentication, and REST APIs via Axios.',
        'Implemented AI-driven resume analysis and automated skill matching pipelines.',
        'Developed validated form modules and responsive Material UI / Tailwind interfaces.'
      ],
      image: '/talentsphere_ai_mockup.jpg',
      demoUrl: '#',
      githubUrl: 'https://github.com/sanjanahp219'
    },
    {
      id: 2,
      title: 'SocialPoster',
      subtitle: 'Multi-Platform Publisher & Analytics Dashboard',
      description: 'Architected reusable dashboard components for content creation, previewing, scheduling and publishing; built drag-and-drop media upload workflows and AI-assisted caption generation.',
      technologies: ['React.js', 'JavaScript', 'REST APIs', 'Redux Toolkit', 'AI Integration', 'Tailwind CSS'],
      features: [
        'Architected reusable dashboard components for content creation, previewing, scheduling, and publishing.',
        'Built intuitive drag-and-drop media upload workflows with image previews and asset management.',
        'Integrated AI-assisted caption generation for automated post creation.',
        'Modular component architecture ensuring smooth real-time dashboard UI updates.'
      ],
      image: '/social_poster_mockup.png',
      demoUrl: '#',
      githubUrl: 'https://github.com/sanjanahp219'
    },
    {
      id: 3,
      title: 'Sophrosyne Semiconductor Website',
      subtitle: 'Corporate High-Tech Semiconductor Web Platform',
      description: 'Converted Figma designs into a pixel-accurate responsive corporate site and improved performance and cross-browser compatibility.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'],
      features: [
        'Converted Figma designs into a pixel-accurate, responsive corporate web application.',
        'Optimized asset loading speeds and asset compression for faster rendering times.',
        'Ensured full cross-browser compatibility and mobile responsiveness across all devices.',
        'Implemented clean, structured HTML5 and custom Bootstrap layouts.'
      ],
      image: '/sophrosyne_semiconductor_mockup.jpg',
      demoUrl: 'https://work-showcase-nine.vercel.app',
      githubUrl: 'https://work-showcase-nine.vercel.app',
      isWebsite: true
    },
    {
      id: 4,
      title: 'Sulochana Enterprises Website',
      subtitle: 'Mobile-First Corporate Business Site',
      description: 'Converted Figma designs into a mobile-first responsive site with reusable sections and optimized assets for faster page loads.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'],
      features: [
        'Converted Figma wireframes into a mobile-first responsive corporate website.',
        'Built modular, reusable page sections for scalable web design layout.',
        'Optimized image assets and script bundles for faster overall page load speed.',
        'Delivered a clean, user-friendly experience across smartphones, tablets, and desktops.'
      ],
      image: '/sulochana_enterprises_mockup.jpg',
      demoUrl: 'https://work-showcase-nine.vercel.app',
      githubUrl: 'https://work-showcase-nine.vercel.app',
      isWebsite: true
    }
  ];

  // Auto-rotation timer (advances every 3.5 seconds, pauses on hover or modal open)
  useEffect(() => {
    if (isPaused || selectedProject !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, selectedProject, projects.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // 3D positioning calculation for each card
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const xOffset = isMobile ? '68%' : isTablet ? '54%' : '50%';
  const sideScale = isMobile ? 0.8 : 0.88;

  const getCardStyle = (index: number) => {
    const total = projects.length;
    let diff = (index - activeIndex) % total;
    if (diff < 0) diff += total;

    // Active Card (Front & Center)
    if (diff === 0) {
      return {
        transform: 'translateX(0%) scale(1) translateZ(0px) rotateY(0deg)',
        zIndex: 30,
        opacity: 1,
        pointerEvents: 'auto' as const,
        filter: 'brightness(1)',
      };
    }

    // Right Card
    if (diff === 1) {
      return {
        transform: `translateX(${xOffset}) scale(${sideScale}) translateZ(-60px) rotateY(-8deg)`,
        zIndex: 20,
        opacity: 0.55,
        pointerEvents: 'auto' as const,
        filter: 'brightness(0.75)',
        cursor: 'pointer',
      };
    }

    // Left Card
    if (diff === total - 1) {
      return {
        transform: `translateX(-${xOffset}) scale(${sideScale}) translateZ(-60px) rotateY(8deg)`,
        zIndex: 20,
        opacity: 0.55,
        pointerEvents: 'auto' as const,
        filter: 'brightness(0.75)',
        cursor: 'pointer',
      };
    }

    // Back Card (opposite in circle, hidden smoothly behind)
    return {
      transform: 'translateX(0%) scale(0.68) translateZ(-140px) rotateY(0deg)',
      zIndex: 10,
      opacity: 0,
      pointerEvents: 'none' as const,
      filter: 'brightness(0.4)',
    };
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col justify-center bg-transparent transition-colors duration-300 overflow-hidden pb-16"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-projects">CREATIONS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 project-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 mb-3">
            <Sparkles size={14} className="text-indigo-500 animate-pulse" />
            <span>Interactive Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg">
            A selection of production-ready applications, showcasing responsive architecture, state management pipelines, and REST API integrations.
          </p>
        </div>

        {/* 3D Auto-Rotating Carousel Stage */}
        <div 
          className="project-carousel-wrapper relative w-full max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 3D Perspective Stage */}
          <div 
            className="relative w-full h-[520px] sm:h-[550px] md:h-[570px] flex items-center justify-center"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={project.id}
                  style={style}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  className={`absolute w-[88%] sm:w-[72%] md:w-[62%] lg:w-[48%] max-w-[460px] transition-all duration-700 ease-out select-none ${
                    isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-85'
                  }`}
                >
                  <div 
                    className={`flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300 ${
                      isActive 
                        ? 'bg-white dark:bg-slate-900 border border-indigo-500/50 dark:border-indigo-400/50 shadow-2xl shadow-indigo-600/30 dark:shadow-indigo-950/90 ring-1 ring-indigo-500/30' 
                        : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 shadow-lg'
                    }`}
                  >
                    
                    {/* Project Image Panel */}
                    <div className="relative group overflow-hidden h-44 sm:h-48 md:h-52 bg-slate-200 dark:bg-slate-900">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="p-2.5 bg-white text-slate-900 rounded-full hover:scale-110 shadow-lg transition-transform duration-200"
                          aria-label="View Project Info"
                        >
                          <Info size={18} />
                        </button>
                        <a 
                          href={project.isWebsite ? project.demoUrl : project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 bg-white text-slate-900 rounded-full hover:scale-110 shadow-lg transition-transform duration-200"
                          aria-label={project.isWebsite ? "Visit Website" : "GitHub Repository"}
                        >
                          {project.isWebsite ? <ExternalLink size={18} /> : <Github size={18} />}
                        </a>
                      </div>
                      
                      {/* Active Project Pill Badge */}
                      {isActive && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-600/90 text-white backdrop-blur-md shadow-md shadow-indigo-600/30">
                          Active Showcase
                        </div>
                      )}
                    </div>

                    {/* Project Body */}
                    <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                      <div className="mb-2.5">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-0.5 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card CTA Actions */}
                      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-150 dark:border-slate-800/80">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex-grow inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                          <span>View Details</span>
                        </button>
                        {project.isWebsite ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                            aria-label="Visit Website"
                          >
                            <span>Live Site</span>
                            <ExternalLink size={13} />
                          </a>
                        ) : (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                            aria-label="View on GitHub"
                          >
                            <span>GitHub</span>
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Left/Right Arrows & Dots */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4">
            
            {/* Left Control Arrow */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full glass hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full glass hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2.5 rounded-full glass hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-sm ml-1"
                aria-label={isPaused ? "Play rotation" : "Pause rotation"}
                title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>

            {/* Circular / Pill Indicator Dots with animated progress */}
            <div className="flex items-center gap-2">
              {projects.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                      isActive 
                        ? 'w-10 h-2.5 bg-slate-200 dark:bg-slate-800 border border-indigo-500/40' 
                        : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  >
                    {isActive && (
                      <span 
                        key={activeIndex}
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"
                        style={{
                          animation: isPaused ? 'none' : 'carouselProgress 3.5s linear forwards',
                          width: isPaused ? '100%' : undefined,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Current Project Caption */}
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">0{activeIndex + 1}</span> / 0{projects.length} • {projects[activeIndex].title}
            </div>

          </div>
        </div>

        {/* Interactive Detailed Modal */}
        {selectedProject && typeof document !== 'undefined' && createPortal(
          <div 
            data-lenis-prevent
            onClick={() => setSelectedProject(null)}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overscroll-contain"
          >
            <div 
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[86vh] max-h-[86vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-scale-up overscroll-contain"
            >
              
              {/* Modal Top Header (Sticky) */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex-shrink-0">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white line-clamp-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div 
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 overscroll-contain"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  
                  {/* Left Column: Image & Quick Actions */}
                  <div className="md:col-span-5 flex flex-col space-y-4">
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-950">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-auto object-cover max-h-56"
                      />
                    </div>
                    
                    <div className="pt-1">
                      {selectedProject.isWebsite ? (
                        <a 
                          href={selectedProject.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 dark:shadow-indigo-950/25 transition-all text-sm"
                        >
                          <ExternalLink size={16} />
                          <span>Visit Live Website</span>
                        </a>
                      ) : (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full inline-flex justify-center items-center gap-2.5 py-3 px-4 rounded-xl font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-800 dark:border-slate-700 shadow-lg shadow-slate-950/20 transition-all text-sm"
                        >
                          <Github size={18} />
                          <span>View on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Overview, Features & Tech Stack */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        Project Overview
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                        Key Implementation Features
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack badges */}
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
