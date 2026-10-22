import React, { useRef } from 'react';
import { Layers, Monitor, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background text horizontal movement
    gsap.fromTo('.parallax-bg-text-about',
      { x: -180 },
      {
        x: 180,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      }
    );

    gsap.from('.about-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
    });
  }, { scope: sectionRef });

  const philosophies = [
    {
      icon: <Layers className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      title: 'Reusable Components',
      description: 'Building modular, clean, and highly reusable components to streamline team development and maintain clean architecture.',
    },
    {
      icon: <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: 'Pixel-Perfect UI/UX',
      description: 'Translating visual, high-fidelity designs into pixel-perfect layouts, focusing on micro-interactions and smooth user flows.',
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      title: 'Performance Tuning',
      description: 'Optimizing render behaviors, asset sizes, and code bundles to keep web applications fast, snappy, and responsive.',
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-about">ABOUT</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-[30px] sm:mb-16 about-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-12 h-1 bg-emerald-500 dark:bg-emerald-400 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Let me share a brief story about my professional background and dedication to front-end craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Bio Content */}
          <div className="lg:col-span-6 space-y-6 about-reveal text-center lg:text-left">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Building Production-Ready Responsive Interfaces
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I am a Front End Developer with nearly 2 years of hands-on experience building responsive, production-ready web applications using React.js, JavaScript (ES6+), TypeScript, HTML5, and CSS3. Strong in reusable components, REST API integration, state management, frontend architecture, and performance optimization.
            </p>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Currently at Swaragh Technologies, Bangalore, I develop modular frontend architectures with React Hooks, Redux Toolkit, and Context API. I have delivered 10+ projects end-to-end and maintain 15+ live production systems.
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center sm:justify-start bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center sm:text-left">
                  <span className="block text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">Jan 2025 - Present</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Experience Period</span>
                </div>
                <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-center sm:text-left">
                  <span className="block text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">Swaragh Technologies</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Company (Bangalore)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Philosophy Cards */}
          <div className="lg:col-span-6 space-y-6 about-reveal">
            {philosophies.map((phil, idx) => (
              <div 
                key={idx} 
                className="group flex items-start gap-4 sm:gap-5 bg-slate-50 dark:bg-slate-800/25 border border-slate-150 dark:border-slate-800/50 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-850 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/40 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 self-start w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                  {phil.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-250 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-250">
                    {phil.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {phil.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
