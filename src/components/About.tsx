import React, { useRef } from 'react';
import { Layers, Monitor, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

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
        <div className="text-center max-w-3xl mx-auto mb-16 about-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Let me share a brief story about my professional background and dedication to front-end craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Bio Content */}
          <div className="lg:col-span-6 space-y-6 about-reveal text-center lg:text-left">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Transforming UI/UX Designs Into Interactive Reality
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {portfolioData.about.description1}
            </p>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {portfolioData.about.description2}
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <div className="flex gap-8 items-center bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="block text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{portfolioData.about.startYear}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Start Year</span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div>
                  <span className="block text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{portfolioData.about.currentCompany}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Current Company</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Philosophy Cards */}
          <div className="lg:col-span-6 space-y-6 about-reveal">
            {philosophies.map((phil, idx) => (
              <div 
                key={idx} 
                className="group flex gap-5 bg-slate-50 dark:bg-slate-800/25 border border-slate-150 dark:border-slate-800/50 p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-850 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/40 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                  {phil.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-250 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-250">
                    {phil.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
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
