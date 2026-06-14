import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  color: string;
  speed: number;
  length: number;
}

interface CodeColumn {
  x: number;
  y: number;
  chars: string[];
  speed: number;
  fontSize: number;
  opacity: number;
}

export const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    let cx = width / 2;
    let cy = height / 2;
    const fov = 400; // Field of view
    
    // Performance scaling based on screen size
    const isMobile = width < 768;
    const maxParticles = isMobile ? 80 : 180;
    const maxCodeColumns = isMobile ? 8 : 20;
    
    // Setup Colors based on active theme
    const getColors = (currentTheme: string) => {
      if (currentTheme === 'dark') {
        return {
          particlePalette: [
            'rgba(99, 102, 241, opacity)',  // Indigo
            'rgba(147, 51, 234, opacity)',  // Purple
            'rgba(59, 130, 246, opacity)',  // Blue
            'rgba(255, 255, 255, opacity)', // White
          ],
          codeColor: 'rgba(51, 65, 85, 0.045)', // Slate-700 at low opacity
          codeGlow: 'rgba(99, 102, 241, 0.025)',
        };
      } else {
        return {
          particlePalette: [
            'rgba(79, 70, 229, opacity)',   // Indigo-600
            'rgba(124, 58, 237, opacity)',  // Violet-600
            'rgba(37, 99, 235, opacity)',   // Blue-600
            'rgba(100, 116, 139, opacity)', // Slate-500
          ],
          codeColor: 'rgba(148, 163, 184, 0.02)', // Light Slate-400 at lower opacity
          codeGlow: 'rgba(79, 70, 229, 0.01)',
        };
      }
    };
    
    let colors = getColors(theme);
    
    // Update colors when theme changes
    colors = getColors(theme);
    
    // 1. Initialize Particles (Warp starfield)
    const particles: Particle[] = [];
    const createParticle = (): Particle => {
      const pColor = colors.particlePalette[Math.floor(Math.random() * colors.particlePalette.length)];
      return {
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 700 + 50, // Start closer to screen to increase visibility
        px: 0,
        py: 0,
        color: pColor,
        speed: Math.random() * 2.2 + 0.6, // Slower particle speed
        length: Math.random() * 10 + 4,
      };
    };
    
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }
    
    // 2. Initialize Matrix Code Columns (falling streams in margins)
    const codeChars = '01constletimportReactfunctionuseStateuseEffect{}[]=>classdivspanh1h2psectionexport'.split('');
    const codeColumns: CodeColumn[] = [];
    
    const createCodeColumn = (isLeft: boolean): CodeColumn => {
      // Columns are placed mostly on the left and right 18% margins of screen
      const minX = isLeft ? 0 : width * 0.82;
      const maxX = isLeft ? width * 0.18 : width;
      const fontSize = Math.floor(Math.random() * 5) + 9;
      
      const charCount = Math.floor(Math.random() * 10) + 6;
      const colChars: string[] = [];
      for (let j = 0; j < charCount; j++) {
        colChars.push(codeChars[Math.floor(Math.random() * codeChars.length)]);
      }
      
      return {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * -height - 100,
        chars: colChars,
        speed: Math.random() * 0.6 + 0.3, // Slower falling speed
        fontSize,
        opacity: Math.random() * 0.5 + 0.5,
      };
    };
    
    for (let i = 0; i < maxCodeColumns; i++) {
      // Distribute evenly left and right sides
      codeColumns.push(createCodeColumn(i % 2 === 0));
    }
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
    };
    
    window.addEventListener('resize', handleResize);
    
    // 3. Animation Loop
    const draw = () => {
      // Clear canvas with very subtle fade to leave trails on particles
      ctx.clearRect(0, 0, width, height);
      
      // A. DRAW CODE COLUMNS (Matrix Rain Effect in margins)
      ctx.font = 'bold 12px monospace';
      codeColumns.forEach((col) => {
        col.y += col.speed;
        
        // Reset column if it falls off-screen
        if (col.y > height) {
          const isLeft = col.x < width / 2;
          const fresh = createCodeColumn(isLeft);
          col.x = fresh.x;
          col.y = fresh.y;
          col.chars = fresh.chars;
          col.speed = fresh.speed;
          col.fontSize = fresh.fontSize;
          col.opacity = fresh.opacity;
        }
        
        ctx.font = `${col.fontSize}px monospace`;
        
        // Draw characters vertically
        col.chars.forEach((char, idx) => {
          const charY = col.y + idx * (col.fontSize + 4);
          if (charY < 0 || charY > height) return;
          
          // Fade alpha along the column stream
          const alphaMultiplier = idx === col.chars.length - 1 ? 1 : idx / col.chars.length;
          const themeAlpha = theme === 'dark' ? 0.38 : 0.48; // Enhanced visibility for falling code rain
          const colAlpha = col.opacity * alphaMultiplier * themeAlpha;
          
          ctx.fillStyle = theme === 'dark' 
            ? `rgba(129, 140, 248, ${colAlpha})` // light indigo in dark mode
            : `rgba(99, 102, 241, ${colAlpha})`;  // indigo in light mode
            
          ctx.fillText(char, col.x, charY);
        });
      });
      
      // B. DRAW 3D WARP PARTICLES
      particles.forEach((p) => {
        // Store previous positions for drawing lines
        const prevPx = p.px;
        const prevPy = p.py;
        
        // Move particle closer (decreasing Z)
        p.z -= p.speed;
        
        // Reset particle if it passes viewport
        if (p.z <= 0) {
          const fresh = createParticle();
          p.x = fresh.x;
          p.y = fresh.y;
          p.z = Math.random() * 400 + 300; // Reset closer to screen to stay in visible space
          p.color = fresh.color;
          p.speed = fresh.speed;
          
          // Re-project initial coords so we don't draw a line from center
          p.px = cx + (p.x / p.z) * fov;
          p.py = cy + (p.y / p.z) * fov;
          return;
        }
        
        // Project 3D coordinates onto 2D screen space
        p.px = cx + (p.x / p.z) * fov;
        p.py = cy + (p.y / p.z) * fov;
        
        // Only draw if within window boundaries and after we have a valid previous point
        if (
          prevPx > 0 && prevPx < width &&
          prevPy > 0 && prevPy < height &&
          p.px > 0 && p.px < width &&
          p.py > 0 && p.py < height
        ) {
          // Compute alpha based on depth (closer particles are more opaque)
          const depthAlpha = (1 - p.z / 1000);
          const baseAlpha = theme === 'dark' ? 0.8 : 0.95; // Higher opacity for light mode
          const minAlpha = theme === 'dark' ? 0.28 : 0.52; // Stronger minimum opacity in light mode
          const finalAlpha = Math.max(minAlpha, depthAlpha * baseAlpha);
          
          // Draw streak line
          ctx.beginPath();
          ctx.strokeStyle = p.color.replace('opacity', finalAlpha.toString());
          ctx.lineWidth = Math.max(theme === 'dark' ? 1.2 : 1.6, (1 - p.z / 1000) * (isMobile ? 2.5 : 4.5)); // Thicker streaks in light mode
          ctx.lineCap = 'round';
          
          // Streak length based on Z depth
          const dx = p.px - prevPx;
          const dy = p.py - prevPy;
          const dist = Math.hypot(dx, dy);
          
          // If the movement is too large (like resetting), limit it
          if (dist < 180) {
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(p.px, p.py);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start drawing loop
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full block bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    />
  );
};
