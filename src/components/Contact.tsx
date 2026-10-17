import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Github = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [opportunityType, setOpportunityType] = useState('Full-Time Job Opportunity');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Detect URL parameter on redirect
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('submitted=true')) {
      setSubmitted(true);
    }
  }, []);

  useGSAP(() => {
    // Parallax background text horizontal movement (left-to-right)
    gsap.fromTo('.parallax-bg-text-contact',
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

    gsap.from('.contact-reveal', {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!subject.trim()) {
      setError('Please provide a role title or subject.');
      return;
    }
    if (!message.trim()) {
      setError('Please share job or project details.');
      return;
    }

    setLoading(true);

    try {
      const emailSubject = `[${opportunityType}] ${subject.trim()} from ${name.trim()}${company.trim() ? ` (${company.trim()})` : ''}`;

      const response = await fetch('https://formsubmit.co/ajax/sanjanahp2020@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Full Name': name.trim(),
          'Email Address': email.trim(),
          'Company / Organization': company.trim() || 'Not specified',
          'Phone / WhatsApp': phone.trim() || 'Not specified',
          'Inquiry Type': opportunityType,
          'Role Title / Subject': subject.trim(),
          'Job Details / Message': message.trim(),
          _subject: emailSubject,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setLoading(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setCompany('');
        setPhone('');
        setSubject('');
        setMessage('');
        // Smoothly navigate / scroll to confirmation
        window.location.hash = 'contact';
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      console.warn('AJAX submission issue, falling back to form navigation:', err);
      // Fallback: Submit natively through form action
      const form = e.target as HTMLFormElement;
      if (form) {
        form.submit();
      } else {
        setLoading(false);
        setError('Unable to send message automatically. Please email directly to sanjanahp2020@gmail.com.');
      }
    }
  };

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Email Me Directly',
      value: 'sanjanahp2020@gmail.com',
      href: 'mailto:sanjanahp2020@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Call / Message',
      value: '+91 82177 62899',
      href: 'tel:+918217762899',
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Location',
      value: 'Bangalore, Karnataka, India',
      href: 'https://maps.google.com',
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={22} />,
      href: 'https://github.com/sanjanahp219',
      label: 'GitHub Profile',
    },
    {
      icon: <Linkedin size={22} />,
      href: 'https://linkedin.com/in/sanjana-hp-28b363285',
      label: 'LinkedIn Profile',
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Parallax Background Typography */}
      <div className="parallax-text-container">
        <span className="parallax-bg-text parallax-bg-text-contact">CONNECT</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 contact-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Reviewed my resume or have an opportunity? Let's discuss full-time roles, contracts, or web projects!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Details & Socials */}
          <div className="lg:col-span-5 space-y-8 contact-reveal">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Let's discuss opportunities
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I am actively seeking Front-End Developer / React.js engineering roles and freelance collaborations. Fill out the opportunity details or connect directly using the information below.
              </p>
            </div>

            {/* List Details */}
            <div className="space-y-4">
              {contactDetails.map((detail, idx) => (
                <a 
                  key={idx}
                  href={detail.href}
                  target={detail.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-850 transition-all duration-200 group"
                >
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-200">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wide">
                      {detail.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {detail.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social connections */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Follow My Profiles
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3.5 bg-slate-50 hover:bg-indigo-650 dark:bg-slate-800/30 dark:hover:bg-indigo-600 rounded-2xl text-slate-600 hover:text-white dark:text-slate-350 dark:hover:text-white border border-slate-200 dark:border-slate-850 hover:shadow-lg shadow-indigo-600/10 transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 contact-reveal">
            <div className="glass p-6 sm:p-8 rounded-3xl shadow-xl">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-scale-up">
                  <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
                    <CheckCircle2 size={44} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-650 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out! Your opportunity details have been sent directly to Sanjana's email (<span className="font-semibold text-indigo-600 dark:text-indigo-400">sanjanahp2020@gmail.com</span>). I will respond as soon as possible.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 text-sm font-semibold rounded-full text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form 
                  id="contact-form"
                  action="https://formsubmit.co/sanjanahp2020@gmail.com" 
                  method="POST" 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  {/* FormSubmit SMTP Configuration */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value={`[${opportunityType}] ${subject || 'New Opportunity'} from ${name || 'Website Visitor'}${company ? ` (${company})` : ''}`} />
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/#contact?submitted=true` : ''} />

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. sarah@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Phone/WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Organization
                      </label>
                      <input 
                        type="text" 
                        id="company"
                        name="Company or Organization"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Inc / Startup"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp <span className="text-slate-400 text-[10px] font-normal lowercase">(optional)</span>
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="Phone or WhatsApp"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Row 3: Opportunity Type & Role/Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="opportunityType" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Inquiry Type <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          id="opportunityType"
                          name="Inquiry Type"
                          required
                          value={opportunityType}
                          onChange={(e) => setOpportunityType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all appearance-none cursor-pointer pr-9"
                          disabled={loading}
                        >
                          <option value="Full-Time Job Opportunity" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">💼 Full-Time Job Opportunity</option>
                          <option value="Freelance / Contract Project" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">💻 Freelance / Contract Project</option>
                          <option value="Interview / Screening Call" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">🤝 Interview / Screening Invitation</option>
                          <option value="Technical Collaboration" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">🚀 Technical Collaboration</option>
                          <option value="General Inquiry" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">💬 General Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Role Title / Subject <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        name="Role or Subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. React.js Developer Role"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Row 4: Job Description / Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Job Details / Project Scope / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea 
                      id="message"
                      name="Message or Job Details"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share details such as role requirements, tech stack, location/remote mode, budget, or meeting availability..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {error}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending Inquiry...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Opportunity Details</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
