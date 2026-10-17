import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagnetic } from '../hooks/useMagnetic';
import profilePhoto from '../assets/sanjana-profile.jpg';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic refs for CTA buttons
  const ctaProjectsRef = useMagnetic(0.22, 75);
  const ctaResumeRef = useMagnetic(0.22, 75);
  const ctaContactRef = useMagnetic(0.22, 75);

  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const roles = ['Front End Developer', 'React.js Specialist', 'TypeScript Engineer', 'UI/UX Developer'];

  // Animated counters state
  const [statsCount, setStatsCount] = useState({ exp: 0, projects: 0, systems: 0 });

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

    // Reusable counter animation function
    const runCounter = () => {
      const counterObj = { exp: 0, projects: 0, systems: 0 };
      setStatsCount({ exp: 0, projects: 0, systems: 0 });
      gsap.to(counterObj, {
        exp: 2,
        projects: 10,
        systems: 15,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          setStatsCount({
            exp: Math.round(counterObj.exp),
            projects: Math.round(counterObj.projects),
            systems: Math.round(counterObj.systems),
          });
        },
        onComplete: () => {
          setStatsCount({ exp: 2, projects: 10, systems: 15 });
        },
      });
    };

    // Initial load trigger when hero-stats fades in
    tl.add(() => {
      runCounter();
    }, '<');

    // Repeat counter animation whenever re-entering the Hero section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom 20%',
      onLeave: () => {
        setStatsCount({ exp: 0, projects: 0, systems: 0 });
      },
      onEnterBack: () => {
        runCounter();
      },
    });

  }, { scope: containerRef });

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-0 sm:pb-2 lg:pb-4 overflow-hidden transition-colors duration-300"
    >
      {/* Background Gradients blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <span className="hero-badge-intro inline-flex items-center self-center lg:self-start px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 mb-3 sm:mb-4 max-w-full">
              Front End Developer | React.js Specialist
            </span>
            
            <h1 className="hero-title tracking-tight text-slate-900 dark:text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl mb-2 sm:mb-3 leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Sanjana H P</span> 👋
            </h1>
            
            <h2 className="hero-subtitle text-base sm:text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 mb-3 sm:mb-4 min-h-[28px] sm:min-h-[32px]">
              <span className="typewriter-cursor">{displayText}</span>
            </h2>
            
            <p className="hero-desc text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-6 leading-relaxed">
              Front End Developer with nearly 2 years of hands-on experience building responsive, production-ready web applications and user interfaces using React.js, JavaScript, HTML5 and CSS3. Strong in reusable components, REST API integration, state management, frontend architecture and performance optimization.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-ctas flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 mb-6 sm:mb-7">
              <a
                ref={ctaProjectsRef}
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-600/25 dark:shadow-indigo-950/40 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-xs sm:text-sm font-semibold"
              >
                <span>View Projects</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                ref={ctaResumeRef}
                href="#resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-xs sm:text-sm font-semibold shadow-xs"
              >
                <FileText size={15} />
                <span>View Resume</span>
              </a>
              <a
                ref={ctaContactRef}
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-xs sm:text-sm font-semibold shadow-xs"
              >
                <Mail size={15} />
                <span>Contact Me</span>
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="hero-stats grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200 dark:border-slate-850 pt-4 sm:pt-5 max-w-lg mx-auto lg:mx-0 w-full">
              <div className="text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {statsCount.exp}+
                </p>
                <p className="text-[11px] xs:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Years Experience</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {statsCount.projects}+
                </p>
                <p className="text-[11px] xs:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Projects Delivered</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {statsCount.systems}+
                </p>
                <p className="text-[11px] xs:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">Production Systems</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Profile Photo */}
          <div className="flex lg:col-span-5 relative justify-center items-center mt-4 lg:mt-0">

            {/* Glow blob behind photo */}
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 opacity-20 dark:opacity-30 blur-3xl -z-10"></div>

            {/* Profile Photo - Elegant Frame */}
            <div className="hero-image-container relative w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 md:w-[19rem] md:h-[19rem] lg:w-[22rem] lg:h-[22rem] p-1.5 rounded-3xl bg-gradient-to-b from-indigo-500/25 via-purple-500/10 to-transparent shadow-2xl shadow-indigo-600/20 dark:shadow-indigo-950/40 transition-transform duration-300 hover:scale-[1.02]">
              <div className="w-full h-full rounded-[22px] overflow-hidden">
                <img
                  src={profilePhoto}
                  alt="Sanjana – Front-End Developer"
                  className="w-full h-full object-cover object-[center_20%]"
                  loading="eager"
                />
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};
