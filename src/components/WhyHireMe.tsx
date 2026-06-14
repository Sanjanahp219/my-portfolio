import React, { useRef } from 'react';
import { Smartphone, Code2, Zap, Shuffle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyHireMe: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.hire-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
    });
  }, { scope: sectionRef });

  const reasons = [
    {
      icon: <Smartphone className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
      title: 'Responsive Design',
      tagline: 'Mobile-first modern websites',
      description: 'Ensuring that layouts flow smoothly across fluid viewports, from smart watches and cellular phones to widescreen desktop screens.',
    },
    {
      icon: <Code2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
      title: 'Clean Code',
      tagline: 'Reusable & maintainable React',
      description: 'Writing documented, dry, and easily testable functional components that ensure high code maintenance and smooth team collaboration.',
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-600 dark:text-amber-400" />,
      title: 'Performance',
      tagline: 'Fast-loading optimized applications',
      description: 'Minimizing asset overhead, fine-tuning component update structures, and auditing bundles to keep PageSpeed indexes high.',
    },
    {
      icon: <Shuffle className="w-7 h-7 text-purple-600 dark:text-purple-400" />,
      title: 'API Integration',
      tagline: 'Experience working with REST APIs',
      description: 'Setting up secure, structured connection endpoints with complete request formatting, status handles, and dynamic content states.',
    },
  ];

  return (
    <section 
      id="why-hire-me" 
      ref={sectionRef} 
      className="bg-transparent transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 hire-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Why Hire Me?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            What I bring to your engineering team as a dedicated React & Front-End Developer.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="hire-reveal">
              <div 
                className="flex flex-col justify-between h-full p-8 bg-slate-50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800/60 rounded-3xl hover:bg-white dark:hover:bg-slate-850 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group glow-card-hover"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="inline-flex p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {reason.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 mb-4 tracking-wide uppercase">
                    {reason.tagline}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Decorative line decoration */}
                <div className="w-8 h-1 bg-slate-200 dark:bg-slate-850 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-500 rounded-full transition-all duration-300 mt-6"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
