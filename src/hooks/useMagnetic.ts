import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Reusable hook to apply a magnetic hover effect to an element using GSAP.
 * @param strength The pull strength (multiplier). Higher = stronger magnetic warp. Default 0.3.
 * @param radius The trigger boundary in pixels around the element center. Default 70.
 */
export const useMagnetic = (strength = 0.3, radius = 70) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate center of target element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Compute cursor offset relative to center
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;
      
      // Check absolute distance
      const distance = Math.hypot(offsetX, offsetY);

      if (distance < radius) {
        // Attract element towards the cursor
        gsap.to(el, {
          x: offsetX * strength,
          y: offsetY * strength,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        // Return to center with a springy ease if the cursor exits the boundary
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      // Return to center immediately on mouse leave
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius]);

  return ref;
};
