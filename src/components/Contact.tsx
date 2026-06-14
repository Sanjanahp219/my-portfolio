import React, { useState, useRef } from 'react';
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
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
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
    if (!message.trim()) {
      setError('Please write a message.');
      return;
    }

    setLoading(true);

    // Mock API submission latency
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Email Me Directly',
      value: 'sanjana@example.com',
      href: 'mailto:sanjana@example.com',
    },
    {
      icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Call / Message',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Location',
      value: 'Bengaluru, India',
      href: 'https://maps.google.com',
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={22} />,
      href: 'https://github.com',
      label: 'GitHub Profile',
    },
    {
      icon: <Linkedin size={22} />,
      href: 'https://linkedin.com',
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
            Have a project in mind or want to discuss a full-time front-end position? Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Details & Socials */}
          <div className="lg:col-span-5 space-y-8 contact-reveal">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Let's discuss details
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I am generally open to freelance collaborations, open-source projects, and React engineering opportunities. Use the contact details below or drop a note on the form.
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
            <div className="glass p-8 sm:p-10 rounded-3xl shadow-xl">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-scale-up">
                  <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
                    <CheckCircle2 size={44} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-650 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, Sanjana! I will review your message and respond to your email as soon as possible.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 text-sm font-semibold rounded-full text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea 
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can I help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 dark:text-white transition-all resize-none"
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
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-755 disabled:bg-indigo-400 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-950/20 hover:scale-101 transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Send Message</span>
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
