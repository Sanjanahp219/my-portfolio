import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { WhyHireMe } from './components/WhyHireMe';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Synchronize Lenis scrolling frame updates with GSAP Ticker
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Initial ScrollTrigger update to prevent rendering delays
    ScrollTrigger.update();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ThemeProvider>
      <ReactLenis ref={lenisRef} autoRaf={false} root>
        <BackgroundAnimation />
        <div className="min-h-screen bg-transparent text-slate-850 dark:text-slate-100 transition-colors duration-300 flex flex-col relative z-10">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <WhyHireMe />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;

