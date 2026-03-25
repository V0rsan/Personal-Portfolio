import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const projectsData = [
  {
    id: 1,
    title: 'Pixel Card Portfolio',
    category: 'Clean Portfolio',
    year: '2025',
    description: 'A clean and modern portfolio website for a pixel card designer. Built with React and Tailwind CSS, it features a minimalist design with smooth animations and a focus on showcasing the designer\'s work.',
    tech: ['React', 'Tailwind CSS', 'GSAP'],
    image: '/assets/project-1.png',
    liveUrl: 'https://client-s-project-1.vercel.app/'
  },
  {
    id: 2,
    title: 'Nityasha',
    category: 'AI Web App',
    year: '2024',
    description: 'A personal assistance AI web app built with React and Tailwind CSS, it features a minimalist design with smooth animations and a focus on showcasing the designer\'s work.',
    tech: ['React', 'Tailwind CSS', 'NextJS', 'Gemini API'],
    image: '/assets/project-2.png',
    liveUrl: 'https://nityasha-com.vercel.app/'
  },
  {
    id: 3,
    title: 'W Builds',
    category: 'SaaS Mobile Application',
    year: '2025',
    description: 'A mobile application for construction management. Built with React and Tailwind CSS, it features a minimalist design with smooth animations and a focus on showcasing the designer\'s work.',
    tech: ['React', 'NextJS', 'Tailwind CSS'],
    image: '/assets/project-3.png',
    liveUrl: 'https://w-builds.vercel.app/'
  }
];

export const ProjectsSection = () => {
  const containerRef = useRef(null);
  // Track which project is open purely as a ref — no state-driven re-renders mid-animation
  const activeIndexRef = useRef(null);
  const detailRefs = useRef([]);
  const arrowRefs = useRef([]);
  const arrowBorderRefs = useRef([]);
  // Keep a ref for currently running close tween so we can kill it before opening another
  const closeTweenRef = useRef(null);

  const openDetail = (index) => {
    const el = detailRefs.current[index];
    if (!el) return;

    // Measure the real pixel height
    gsap.set(el, { height: 'auto', opacity: 1, overflow: 'hidden' });
    const fullHeight = el.offsetHeight;
    gsap.set(el, { height: 0, opacity: 0 });

    gsap.to(el, {
      height: fullHeight,
      opacity: 1,
      duration: 0.55,
      ease: 'power3.out',
      clearProps: 'height', // Allow natural reflow after open
      onComplete: () => {
        gsap.set(el, { overflow: 'visible' });
      }
    });

    // Animate arrow — pure GSAP, no React state
    gsap.to(arrowRefs.current[index], { rotation: -45, duration: 0.4, ease: 'power2.out' });
    gsap.to(arrowBorderRefs.current[index], { borderColor: '#efbf04', color: '#efbf04', duration: 0.4, ease: 'power2.out' });
  };

  const closeDetail = (index, onComplete) => {
    const el = detailRefs.current[index];
    if (!el) return;

    // Fix height to pixel before animating (required since we cleared it)
    gsap.set(el, { height: el.offsetHeight, overflow: 'hidden' });

    closeTweenRef.current = gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete
    });

    gsap.to(arrowRefs.current[index], { rotation: 0, duration: 0.35, ease: 'power2.out' });
    gsap.to(arrowBorderRefs.current[index], {
      borderColor: 'rgba(246,239,201,0.2)',
      color: '#f4efe2',
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  const handleProjectClick = (index) => {
    const current = activeIndexRef.current;

    if (current === index) {
      // Toggle closed
      activeIndexRef.current = null;
      closeDetail(index);
    } else {
      if (current !== null) {
        // Kill any in-progress close, then close current and open next
        if (closeTweenRef.current) closeTweenRef.current.kill();
        closeDetail(current, () => {
          activeIndexRef.current = index;
          openDetail(index);
        });
      } else {
        activeIndexRef.current = index;
        openDetail(index);
      }
    }
  };

  return (
    <section
      className="bg-[#111] text-[#f4efe2] py-24 md:py-48 px-6 md:px-12 relative overflow-hidden"
      ref={containerRef}
      id="projects"
    >
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(239,191,4,0.03)_0%,_transparent_60%)]" />

      <div className="max-w-[1240px] mx-auto relative z-10 block">
        <div className="mb-20">
          <h2 className="text-[10vw] md:text-8xl lg:text-9xl font-serif tracking-tight mb-4 flex flex-col md:flex-row items-baseline gap-4 text-[#f6f0de]">
            <span>Selected</span>
            <span className="text-[#efbf04] italic">Work</span>
          </h2>
          <p className="text-[#efe7c8]/60 text-lg md:text-xl max-w-lg font-thin tracking-wide mt-6">
            A showcase of minimal interfaces, dynamic interactions, and thoughtfully engineered digital products.
          </p>
        </div>

        <div className="flex flex-col border-t border-[rgba(246,239,201,0.1)]">
          {projectsData.map((project, i) => (
            <div
              key={project.id}
              className="border-b border-[rgba(246,239,201,0.1)]"
              style={{ willChange: 'transform' }}
            >
              {/* Clickable row — no CSS transition on bg to avoid fighting GSAP */}
              <div
                className="py-10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer group px-2 md:-mx-4 md:px-4 select-none"
                onClick={() => handleProjectClick(i)}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                  <h3 className="text-4xl md:text-6xl font-serif tracking-tight group-hover:text-[#efbf04] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-[#efe7c8]/40 text-sm tracking-normal uppercase font-thin">
                    {project.category}
                  </span>
                </div>
                <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <span className="text-[#efe7c8]/50 text-base md:text-sm tracking-widest">{project.year}</span>
                  {/* Arrow — driven entirely by GSAP, not React state */}
                  <div
                    ref={el => arrowBorderRefs.current[i] = el}
                    className="w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: 'rgba(246,239,201,0.2)', color: '#f4efe2', willChange: 'transform' }}
                  >
                    <span ref={el => arrowRefs.current[i] = el} style={{ display: 'inline-flex', willChange: 'transform' }}>
                      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M1 13L13 1M13 1H1M13 1V13" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable detail — starts collapsed */}
              <div
                ref={el => detailRefs.current[i] = el}
                style={{ height: 0, opacity: 0, overflow: 'hidden', willChange: 'height, opacity' }}
              >
                <div className="pb-16 pt-2 flex flex-col lg:flex-row gap-10 md:gap-16 px-2 md:px-4">
                  <div className="flex-1 flex flex-col justify-between max-w-2xl">
                    <p className="text-[#efe7c8]/70 text-lg md:text-xl leading-relaxed font-thin mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-col">
                      <h4 className="text-[#efe7c8]/30 uppercase tracking-[0.2em] text-xs mb-5 font-semibold">Core Technology</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {project.tech.map((t, index) => (
                          <span key={index} className="px-4 py-2 rounded-full border border-[rgba(246,239,201,0.12)] text-[#efbf04] text-xs md:text-sm tracking-wide bg-[#1a1412]/80 backdrop-blur-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.liveUrl && (
                      <div className="mt-8">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#efbf04]/40 bg-[#efbf04]/8 text-sm font-light tracking-widest hover:border-[#efbf04]/80 hover:bg-[#efbf04]/15 transition-all duration-300 shadow-md shadow-[#efbf04]/10 hover:shadow-[#efbf04]/25"
                          style={{ background: 'linear-gradient(135deg, rgba(239,191,4,0.08), rgba(245,158,11,0.05))' }}
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#efbf04] opacity-70"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#efbf04]"></span>
                          </span>
                          <span style={{ background: 'linear-gradient(90deg, #efbf04, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Live Preview</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 lg:max-w-xl xl:max-w-2xl w-full mx-auto pb-4">
                    <div className="rounded-2xl overflow-hidden border border-[rgba(246,239,201,0.15)] bg-[#1a1412] aspect-video relative shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full pointer-events-none h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
