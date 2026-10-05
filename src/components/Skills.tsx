import React, { useRef } from 'react';
import { Layout, Palette, Workflow, Globe, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background text horizontal movement (right-to-left)
    gsap.fromTo('.parallax-bg-text-skills',
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

    gsap.from('.skills-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 45,
      duration: 0.8,
      stagger: 0.15,
    });
  }, { scope: sectionRef });

  // We'll map the icons to the imported skills
  const iconMap = [
    <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    <Workflow className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <Globe className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    <Wrench className="w-6 h-6 text-rose-600 dark:text-rose-400" />
  ];

  const skillCategories = portfolioData.skills.map((category, idx) => ({
    ...category,
    icon: iconMap[idx % iconMap.length]
  }));

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-skills">EXPERT</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 skills-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            My Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Here are the languages, frameworks, libraries, and tools I have specialized in over the past 2+ years.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skills-reveal">
              <div 
                className={`flex flex-col justify-between h-full p-8 rounded-3xl bg-gradient-to-br ${category.gradient} border border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-2xl dark:hover:shadow-indigo-950/20 hover:-translate-y-1.5 transition-all duration-300 group glow-card-hover`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Subtle indicator bar */}
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden mt-8">
                  <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
