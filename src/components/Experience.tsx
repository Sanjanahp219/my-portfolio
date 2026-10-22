import React, { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background text horizontal movement (right-to-left)
    gsap.fromTo('.parallax-bg-text-exp',
      { x: 180 },
      {
        x: -180,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      }
    );

    gsap.from('.exp-reveal', {
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

  const responsibilities = [
    'Build and maintain production-ready frontend features, translating product requirements, designs and wireframes into responsive, reusable React components.',
    'Develop modular frontend architecture with React Hooks, Redux Toolkit and Context API for maintainable UI modules and predictable state management.',
    'Integrate REST APIs with Axios and Fetch, handling asynchronous data flows, JSON-driven functionality and JWT-based authentication.',
    'Work with product and backend teams to review UI ideas, confirm technical feasibility and deliver high-quality interfaces with strong UX and cross-browser support.',
    'Optimize frontend performance with lazy loading, code splitting and memoization; use Chrome DevTools, Vite/Webpack and ESLint for debugging and code quality.',
    'Use Git and GitHub for version control, pull requests and code reviews; delivered 10+ projects end-to-end and maintain 15+ live production systems.'
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-exp">TIMELINE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-[30px] sm:mb-16 exp-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-emerald-500 dark:bg-emerald-400 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A review of my active role and contributions as a Front End Developer.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-emerald-200 dark:border-emerald-900/60 pl-8 ml-4 exp-reveal">
            
            {/* Timeline dot */}
            <div className="absolute -left-[11px] top-0 p-1.5 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full ring-4 ring-emerald-100 dark:ring-emerald-950">
              <Briefcase size={14} />
            </div>

            {/* Career Card */}
            <div className="glass p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Front End Developer
                  </h3>
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Swaragh Technologies
                  </p>
                </div>
                
                {/* Meta details */}
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-550 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <Calendar size={12} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Jan 2025 - Present</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <MapPin size={12} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Bangalore, Karnataka, India</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-wide">
                  Core Responsibilities & Achievements:
                </h4>
                <ul className="space-y-3.5">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-slate-650 dark:text-slate-400">
                      <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
