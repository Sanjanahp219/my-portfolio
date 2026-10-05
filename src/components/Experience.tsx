import React, { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

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

  const experiences = portfolioData.experience;

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
        <div className="text-center max-w-3xl mx-auto mb-16 exp-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A review of my active role and contributions as a frontend developer.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-indigo-250 dark:border-indigo-900 pl-8 ml-4 exp-reveal">
            
            {/* Timeline dot */}
            <div className="absolute -left-[11px] top-0 p-1.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full ring-4 ring-indigo-100 dark:ring-indigo-950">
              <Briefcase size={14} />
            </div>

            {experiences.map((exp, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Meta details */}
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-550 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <Calendar size={12} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <MapPin size={12} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-wide">
                    Core Responsibilities & Achievements:
                  </h4>
                  <ul className="space-y-3.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex gap-3 items-start text-sm text-slate-650 dark:text-slate-400">
                        <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};
