import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export const ShatterText = ({
  text,
  shatterTarget,
  className = '',
  shatterClassName = '',
  color = '#dd857fff',
  delay = 0
}) => {
  const shatterRef = useRef(null);
  const tlRef = useRef(null);

  const playAnimation = useCallback(() => {
    if (!shatterRef.current) return;

    // Kill any running animation before restarting
    if (tlRef.current) tlRef.current.kill();

    const chars = shatterRef.current.querySelectorAll('.shatter-char');

    // Reset chars to visible before starting
    gsap.set(chars, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 });

    const tl = gsap.timeline({ delay });
    tlRef.current = tl;

    // Wait a bit, then shatter
    tl.to(chars, {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-360, 360),
      opacity: 0,
      scale: () => gsap.utils.random(0.2, 2.5),
      duration: 1,
      ease: 'power3.out',
      stagger: {
        amount: 0.1,
        from: 'center'
      },
    }, "+=2")
      // Wait shattered, then reassemble
      .to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
        stagger: {
          amount: 0.1,
          from: 'edges'
        },
      }, "+=2.5");
  }, [delay]);

  useEffect(() => {
    if (!shatterRef.current) return;

    // Use IntersectionObserver so animation replays every time it scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAnimation();
        } else {
          // Kill animation when out of view so it resets cleanly next time
          if (tlRef.current) tlRef.current.kill();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(shatterRef.current);

    return () => {
      observer.disconnect();
      if (tlRef.current) tlRef.current.kill();
    };
  }, [playAnimation]);

  const targetIndex = text.indexOf(shatterTarget);
  if (targetIndex === -1) return <div className={className}>{text}</div>;

  const beforeText = text.slice(0, targetIndex);
  const afterText = text.slice(targetIndex + shatterTarget.length);

  return (
    <div className={`relative inline-block select-none whitespace-pre-wrap ${className}`}>
      <span className="transition-opacity duration-300">{beforeText}</span>
      <span ref={shatterRef} className={`inline-block whitespace-pre ${shatterClassName}`}>
        {shatterTarget.split('').map((char, index) => (
          <span
            key={index}
            className="shatter-char inline-block"
            style={{
              position: 'relative',
              color: char !== ' ' ? color : 'inherit',
              transition: 'color 0.3s ease'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span className="transition-opacity duration-300">{afterText}</span>
    </div>
  );
};
