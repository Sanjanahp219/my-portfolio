import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMagnetic } from '../hooks/useMagnetic';
import { portfolioData } from '../data/portfolioData';
import profilePhoto from '../assets/profile.jpg';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic refs for CTA buttons
  const ctaProjectsRef = useMagnetic(0.22, 75);
  const ctaResumeRef = useMagnetic(0.22, 75);
  const ctaContactRef = useMagnetic(0.22, 75);

  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const roles = portfolioData.hero.roles;

  useEffect(() => {
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer: number;

    const tick = () => {
      const currentRole = roles[currentRoleIdx];
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, currentCharIdx + 1));
        currentCharIdx++;

        if (currentCharIdx === currentRole.length) {
          isDeleting = true;
          typingSpeed = 2200; // Hold full word
        } else {
          typingSpeed = 80;
        }
      } else {
        setDisplayText(currentRole.substring(0, currentCharIdx - 1));
        currentCharIdx--;

        if (currentCharIdx === 0) {
          isDeleting = false;
          currentRoleIdx = (currentRoleIdx + 1) % roles.length;
          typingSpeed = 500; // Pause before next word
        } else {
          typingSpeed = 40;
        }
      }

      timer = window.setTimeout(tick, typingSpeed);
    };

    timer = window.setTimeout(tick, 800); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Setup floating animation for each badge with slightly different parameters to create organic movement
    gsap.to('.badge-react', {
      y: -15,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
    
    gsap.to('.badge-ts', {
      y: 12,
      rotation: -3,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.2,
    });
    
    gsap.to('.badge-mui', {
      y: -10,
      rotation: 4,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.4,
    });
    
    gsap.to('.badge-tailwind', {
      y: 8,
      rotation: -4,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.6,
    });
    
    gsap.to('.badge-js', {
      y: -14,
      rotation: 6,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.1,
    });

    // Fade-in entry animations for text and illustration elements
    const tl = gsap.timeline();
    tl.from('.hero-badge-intro', { opacity: 0, y: 20, duration: 0.5 })
      .from('.hero-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.4')
      .from('.hero-ctas', { opacity: 0, y: 25, duration: 0.5 }, '-=0.4')
      .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-image-container', { opacity: 0, scale: 0.9, duration: 0.7 }, '-=0.6')
      .from('.floating-badge', { opacity: 0, scale: 0.5, stagger: 0.1, duration: 0.4 }, '-=0.3');

  }, { scope: containerRef });

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 flex items-center justify-center overflow-hidden transition-colors duration-300"
    >
      {/* Background Gradients blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <span className="hero-badge-intro inline-flex items-center self-center lg:self-start px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 mb-5">
              {portfolioData.hero.badge}
            </span>
            
            <h1 className="hero-title tracking-tight text-slate-900 dark:text-white font-extrabold text-3xl sm:text-5xl md:text-6xl mb-4 leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{portfolioData.name.split(' ')[0]}</span> 👋
            </h1>
            
            <h2 className="hero-subtitle text-lg sm:text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4 sm:mb-5 min-h-[32px] sm:min-h-[36px]">
              <span className="typewriter-cursor">{displayText}</span>
            </h2>
            
            <p className="hero-desc text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              {portfolioData.hero.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-ctas flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12">
              <a
                ref={ctaProjectsRef}
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-950/20 hover:scale-105 transition-all duration-200 font-semibold animate-pulse-slow"
              >
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>
              <a
                ref={ctaResumeRef}
                href="#resume"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-105 transition-all duration-200 font-semibold"
              >
                <FileText size={18} />
                <span>Download Resume</span>
              </a>
              <a
                ref={ctaContactRef}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-105 transition-all duration-200 font-semibold"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="hero-stats grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-850 pt-8 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{portfolioData.hero.stats.experience}+</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{portfolioData.hero.stats.projects}</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Projects Completed</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">{portfolioData.hero.stats.focus}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Developer</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Profile Photo */}
          <div className="hidden sm:flex lg:col-span-5 relative justify-center items-center">

            {/* Glow blob behind photo */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 opacity-20 dark:opacity-30 blur-3xl -z-10"></div>

            {/* Profile Photo - Square */}
            <div className="hero-image-container relative w-72 h-72 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-600/20 dark:shadow-indigo-900/40 transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={profilePhoto} // TODO: Add real profile photo
                alt={`${portfolioData.name} – ${portfolioData.role}`}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};
