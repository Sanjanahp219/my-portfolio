import React, { useState, useRef } from 'react';
import { ExternalLink, X, Info } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

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
}

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

    gsap.from('.project-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, { scope: sectionRef });

  const projects: Project[] = portfolioData.projects;

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-projects">CREATIONS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 project-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A selection of my recent works, showcasing responsive layouts, state management pipelines, and third-party API integrations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-reveal">
              <div 
                className="flex flex-col h-full glass rounded-3xl overflow-hidden hover:shadow-2xl dark:hover:shadow-slate-950/50 hover:-translate-y-1.5 transition-all duration-300 glow-card-hover"
              >
                
                {/* Project Image Panel */}
                <div className="relative group overflow-hidden h-48 sm:h-52 bg-slate-200 dark:bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 shadow-lg transition-transform duration-200"
                      aria-label="View Project Info"
                    >
                      <Info size={20} />
                    </button>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 shadow-lg transition-transform duration-200"
                      aria-label="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                {/* Project Body */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card CTA Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-150 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-grow inline-flex justify-center items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                    >
                      <span>View Details</span>
                    </button>
                    <a
                      href={project.demoUrl}
                      className="inline-flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Interactive Detailed Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-up">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-705 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                
                {/* Left side in modal: Image & Actions */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md mb-6">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-grow inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      <Github size={18} />
                      <span>Repository</span>
                    </a>
                    <a 
                      href={selectedProject.demoUrl}
                      className="flex-grow inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 dark:shadow-indigo-950/25 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Right side in modal: Details & Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-0.5">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Features Checklist */}
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-350 uppercase tracking-wide mb-3">
                      Key Implementation Features:
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-350 uppercase tracking-wide mb-3">
                      Technology Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
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
        )}

      </div>
    </section>
  );
};
