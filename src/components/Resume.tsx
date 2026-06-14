import React, { useState, useRef } from 'react';
import { FileDown, Eye, Printer, X, Award, Briefcase, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Resume: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showFullResume, setShowFullResume] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

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
              My resume outlines my coding history, technical expertise, and collaborative projects. Feel free to inspect the summary preview here or open the full sheet.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 pt-4">
              <button
                onClick={() => setShowFullResume(true)}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-750 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-950/20 transition-all hover:scale-102"
              >
                <Eye size={18} />
                <span>View Full Resume</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all hover:scale-102"
              >
                <Printer size={18} />
                <span>Print / Save as PDF</span>
              </button>

              <a
                href="data:text/plain;charset=utf-8,Sanjana - Front-End Developer Resume%0A%0ASUMMARY%0APassionate React and Front-End Developer with 2+ years of experience building responsive, user-friendly applications.%0A%0AEXPERIENCE%0A- Swaragh Technology, Front-End Developer (2024 - Present)%0A%0ASKILLS%0A- React, TypeScript, JavaScript, Tailwind CSS, Material UI, Redux, REST APIs, Git"
                download="sanjana_resume.txt"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all text-sm"
              >
                <FileDown size={16} />
                <span>Download plain text resume</span>
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
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Sanjana</h4>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">Front-End Developer | React Developer</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">sanjana@example.com | Bengaluru, India</p>
              </div>

              {/* Experience Mini Block */}
              <div className="space-y-4">
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-3">
                    <Briefcase size={12} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Recent Experience</span>
                  </h5>
                  <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Front-End Developer</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">Swaragh Technology | 2024 - Present</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                      Developed responsive websites, built custom React components, integrated REST APIs, and optimized layouts.
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
                    {['React.js', 'TypeScript', 'Tailwind CSS', 'Material UI', 'REST APIs', 'Redux'].map((tech, idx) => (
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

        {/* Full Resume Overlay Modal */}
        {showFullResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm print:relative print:p-0 print:bg-white print:backdrop-blur-none">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 print:max-h-none print:shadow-none print:border-none print:rounded-none print:p-0 animate-scale-up">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowFullResume(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors print:hidden"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Printable Content */}
              <div className="print-content dark:text-slate-900 bg-white p-2">
                
                {/* Header */}
                <div className="text-center border-b-2 border-indigo-600 pb-6 mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">SANJANA</h1>
                  <p className="text-base font-semibold text-indigo-600 uppercase tracking-wider mt-1">Front-End Developer | React Developer</p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-600 mt-3 font-medium">
                    <span>Bengaluru, India</span>
                    <span>•</span>
                    <span>sanjana@example.com</span>
                    <span>•</span>
                    <span>linkedin.com/in/sanjana</span>
                    <span>•</span>
                    <span>github.com/sanjana</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  
                  {/* Left Column: Summary & Skills */}
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">Profile Summary</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Detail-oriented Front-End Developer with 2 years of experience specializing in building responsive React applications. Passionate about translating designs into pixel-perfect pages, designing modular reusable components, and optimizing site speed.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">Technical Skills</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold text-slate-800">Languages & Core:</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Styling Frameworks:</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">Tailwind CSS, Material UI, CSS Grid / Flexbox</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">State & APIs:</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">Redux Toolkit, Context API, Axios, Fetch, REST APIs</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Developer Tools:</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">Git, GitHub, VS Code, Postman, Vite, npm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Experience, Projects & Education */}
                  <div className="md:col-span-2 space-y-6">
                    
                    {/* Career History */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                        <Briefcase size={14} className="text-indigo-600" />
                        <span>Work Experience</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <h5 className="text-xs font-bold text-slate-850">Front-End Developer</h5>
                            <span className="text-[11px] text-slate-500 font-semibold">2024 - Present</span>
                          </div>
                          <p className="text-xs font-bold text-indigo-600 mt-0.5">Swaragh Technology</p>
                          <ul className="list-disc list-inside text-[11px] text-slate-650 mt-2 space-y-1 pl-1">
                            <li>Developed high-fidelity, responsive client websites transforming UI/UX wireframes.</li>
                            <li>Built reusable customized React components to boost development efficiency.</li>
                            <li>Integrated backend REST API communication channels with Axios.</li>
                            <li>Optimized loading performance and rendering speeds of pages.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Featured Projects */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                        <Award size={14} className="text-indigo-600" />
                        <span>Key Projects</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-start">
                            <h5 className="text-xs font-bold text-slate-850">SocialPoster</h5>
                            <span className="text-[10px] text-slate-500 font-semibold">React, TypeScript, Tailwind, REST API</span>
                          </div>
                          <p className="text-[11px] text-slate-605 mt-1 leading-relaxed">
                            Designed scheduling calendar dashboards and visual analytics charts tracking follower conversion.
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-start">
                            <h5 className="text-xs font-bold text-slate-850">Event Booking System</h5>
                            <span className="text-[10px] text-slate-500 font-semibold">React, Context API, CSS, JavaScript</span>
                          </div>
                          <p className="text-[11px] text-slate-605 mt-1 leading-relaxed">
                            Implemented event category search filters, seat selectors, and secure ticket purchasing pipelines.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3 flex items-center gap-2">
                        <GraduationCap size={14} className="text-indigo-600" />
                        <span>Education</span>
                      </h4>
                      <div>
                        <div className="flex justify-between items-start">
                          <h5 className="text-xs font-bold text-slate-850">Bachelor of Science in Computer Science / Information Technology</h5>
                          <span className="text-[10px] text-slate-500 font-semibold">Graduated 2023</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Relevant coursework in Web Tech, Data Structures, and Databases</p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Action bar in modal */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-150 dark:border-slate-800 print:hidden">
                <button
                  onClick={() => setShowFullResume(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  Close Preview
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all"
                >
                  <Printer size={16} />
                  <span>Print Resume</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
