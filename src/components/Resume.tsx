import React, { useRef } from 'react';
import { FileDown, Award, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Resume: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.resume-reveal', {
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

  return (
    <section 
      id="resume" 
      ref={sectionRef} 
      className="bg-transparent transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 resume-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Curriculum Vitae
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Review my professional resume or download a copy for offline reading.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: CTA options */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left resume-reveal">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Looking for a Skilled React Developer?
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              My resume outlines my coding history, technical expertise, and collaborative projects. Feel free to inspect the summary preview here or download the full resume.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href="/Sanjana_HP_Resume.pdf"
                download="Sanjana_HP_Resume.pdf"
                className="inline-flex justify-center items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-indigo-600/25 dark:shadow-indigo-950/40 hover:scale-105 active:scale-98 transition-all duration-200 text-sm sm:text-base group"
                aria-label="Download Resume"
              >
                <FileDown size={20} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Paper Mockup Preview */}
          <div className="lg:col-span-7 flex justify-center resume-reveal">
            
            {/* Visual Paper sheet */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl transition-transform duration-350 hover:scale-102 hover:rotate-1">
              
              {/* Top border glow decoration */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-3xl"></div>

              {/* Resume Header */}
              <div className="border-b border-slate-150 dark:border-slate-850 pb-6 mb-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">SANJANA H P</h4>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">Front End Developer</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">sanjanahp2020@gmail.com | +91 82177 62899 | Bangalore, India</p>
              </div>

              {/* Experience Mini Block */}
              <div className="space-y-4">
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-3">
                    <Briefcase size={12} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Recent Experience</span>
                  </h5>
                  <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Front End Developer</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">Swaragh Technologies, Bangalore | Jan 2025 - Present</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                      Build modular React frontend features, Redux Toolkit state architectures, REST API integrations, and frontend performance optimizations.
                    </p>
                  </div>
                </div>

                {/* Skills Mini Block */}
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-3">
                    <Award size={12} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Technical Highlights</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5 pl-4">
                    {['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'REST APIs', 'Tailwind CSS', 'Material UI'].map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
