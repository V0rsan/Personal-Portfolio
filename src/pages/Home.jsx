
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimateSvg } from '../components/AnimateSvg'
import { Github, Linkedin } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa6';
import StaggeredMenu from '../components/navigation/StaggeredMenu'
import { OrbitingCircles } from '../components/ui/orbiting-circles'
import { ShatterText } from '../components/ShatterText'

import { ProjectsSection } from '../components/ProjectsSection'
import { ContactSection } from '../components/ContactSection'


gsap.registerPlugin(ScrollTrigger)

const wrathImage = '/assets/wrath.png'
const nodeImage = '/assets/nodejs.png'
const reactImage = '/assets/reacr.png'
const tailwindImage = '/assets/tailwind.png'
const gsapImage = '/assets/gsap.png'
const nextjsImage = '/assets/nextjs.png'
const framerImage = '/assets/framer.png'
const javascriptImage = '/assets/javascript.png'
const cssImage = '/assets/css.png'
const figmaImage = '/assets/figma.png'

const skillOrbitItems = [
  { label: 'React', icon: <img src={reactImage} alt='' className='projects-tech-image' /> },
  { label: 'Tailwind CSS', icon: <img src={tailwindImage} alt='' className='projects-tech-image' /> },
  { label: 'JavaScript', icon: <img src={javascriptImage} alt='' className='projects-tech-image' /> },
  { label: 'CSS', icon: <img src={cssImage} alt='' className='projects-tech-image' /> },
  { label: 'GSAP', icon: <img src={gsapImage} alt='' className='projects-tech-image' /> },
  { label: 'NodeJS', icon: <img src={nodeImage} alt='' className='projects-tech-image' /> },
];
const roleItems = [
  'WEB DEVELOPER',
  'FRONTEND DEVELOPER',
  'CREATIVE ENGINEER',
  'PART TIME DEVELOPER',
  'FREELANCER',
];
const shadcnImage = '/assets/shadcn.webp'

const socialItems = [
  {
    label: 'GitHub',
    link: 'https://github.com/V0rsan',
    icon: <Github size={16} strokeWidth={1.75} />,
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/vasu-dev-8a2821374/',
    icon: <Linkedin size={16} strokeWidth={1.75} />,
  },
  {
    label: 'Discord',
    link: 'https://discord.gg/9kkC8mZkrp',
    icon: <FaDiscord size={16} strokeWidth={1.75} />,
  },
]
const outerOrbitItems = [
  { label: 'Framer', icon: <img src={framerImage} alt='' className='projects-tech-image' /> },
  { label: 'ShadCN', icon: <img src={shadcnImage} alt='' className='projects-tech-image' /> },
  { label: 'Figma', icon: <img src={figmaImage} alt='' className='projects-tech-image' /> },
]

const skillOrbitAngles = [-90, -30, 30, 90, 150, 210]

const marqueeSequence = Array.from({ length: 3 }, () => roleItems).flat()

const menuItems = [
  { label: 'Home', link: '#home', ariaLabel: 'Go to home section' },
  { label: 'About', link: '#about', ariaLabel: 'Go to about section' },
  { label: 'Projects', link: '#projects', ariaLabel: 'Go to projects section' },
  { label: 'Connect', link: '#contact', ariaLabel: 'Go to contact section' },
]


const INDIA_TIMEZONE = 'Asia/Kolkata'
const DELHI_COORDS = {
  latitude: 28.6139,
  longitude: 77.209,
}

const formatIndiaDateTime = date => {
  const time = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: INDIA_TIMEZONE,
  }).format(date)

  const day = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: INDIA_TIMEZONE,
  }).format(date)

  return { time, day }
}

const Home = () => {
  const mainRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const aboutTorchGlowRef = useRef(null)
  const aboutTorchRef = useRef(null)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [indiaNow, setIndiaNow] = useState(() => formatIndiaDateTime(new Date()))
  const [temperature, setTemperature] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero / Header Animation (after preloader)
      const tl = gsap.timeline({ delay: 1.5 })
      tl.from('.reference-topbar', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.reference-title span', { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
        .from('.reference-name span', { y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, '-=0.6')
        .from('.reference-ticker', { opacity: 0, duration: 1 }, '-=0.2')

      // About Section Animation
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
      })

      gsap.from('.about-copy > *', {
        scrollTrigger: {
          trigger: '.about-copy',
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
      })

      // Skills Section Animation
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      })

      gsap.from('.projects-orbit-shell', {
        scrollTrigger: {
          trigger: '.projects-orbit-shell',
          start: 'top 75%',
          toggleActions: 'play none none reset',
        },
        scale: 0.95, opacity: 0, duration: 1, ease: 'power3.out'
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const updateIndiaNow = () => {
      setIndiaNow(formatIndiaDateTime(new Date()))
    }

    updateIndiaNow()
    const intervalId = window.setInterval(updateIndiaNow, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    const fetchTemperature = async () => {
      try {
        const params = new URLSearchParams({
          latitude: String(DELHI_COORDS.latitude),
          longitude: String(DELHI_COORDS.longitude),
          current: 'temperature_2m',
          timezone: INDIA_TIMEZONE,
          forecast_days: '1',
        })

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`Weather request failed with ${response.status}`)
        }

        const data = await response.json()
        const nextTemperature = data?.current?.temperature_2m

        if (isActive && typeof nextTemperature === 'number') {
          setTemperature(Math.round(nextTemperature))
        }
      } catch {
        if (isActive) {
          setTemperature(null)
        }
      }
    }

    fetchTemperature()
    const intervalId = window.setInterval(fetchTemperature, 15 * 60 * 1000)

    return () => {
      isActive = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const section = aboutSectionRef.current
    if (!section) {
      return undefined
    }

    const torchGlow = aboutTorchGlowRef.current
    const torch = aboutTorchRef.current
    if (!torchGlow || !torch) {
      return undefined
    }

    let frameId = 0
    let bounds = section.getBoundingClientRect()
    let targetX = bounds.width * 0.5
    let targetY = bounds.height * 0.34
    let currentX = targetX
    let currentY = targetY
    let targetRotation = 0
    let currentRotation = 0
    let lastPointerX = targetX
    let isTorchVisible = false
    let isPointerInside = false
    let previousTime = 0

    const updateBounds = () => {
      bounds = section.getBoundingClientRect()
      targetX = Math.min(Math.max(targetX, 0), bounds.width)
      targetY = Math.min(Math.max(targetY, 0), bounds.height)
    }

    const renderTorch = time => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2.4) : 1
      previousTime = time
      const ease = isPointerInside ? 0.18 : 0.1
      const blend = 1 - Math.pow(1 - ease, delta)
      const rotationBlend = 1 - Math.pow(1 - 0.14, delta)

      currentX += (targetX - currentX) * blend
      currentY += (targetY - currentY) * blend
      currentRotation += (targetRotation - currentRotation) * rotationBlend

      const glowX = currentX - bounds.width * 0.5
      const glowY = currentY - bounds.height * 0.5
      torchGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`
      torch.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -10%) rotate(${currentRotation}deg)`

      if (isTorchVisible) {
        frameId = window.requestAnimationFrame(renderTorch)
      } else {
        frameId = 0
        previousTime = 0
      }
    }

    const ensureAnimation = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(renderTorch)
      }
    }

    const resetTorch = () => {
      targetX = bounds.width * 0.5
      targetY = bounds.height * 0.34
      targetRotation = 0
      lastPointerX = targetX
    }

    const handlePointerMove = event => {
      const nextX = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width)
      const deltaX = nextX - lastPointerX

      targetX = nextX
      targetY = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height)
      targetRotation = Math.max(Math.min(deltaX * 0.32, 18), -18)
      lastPointerX = nextX
    }

    const handlePointerEnter = () => {
      isPointerInside = true
      lastPointerX = targetX
    }

    const handlePointerLeave = () => {
      isPointerInside = false
      resetTorch()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isTorchVisible = entry.isIntersecting
        section.classList.toggle('is-torch-active', entry.isIntersecting)

        if (entry.isIntersecting) {
          updateBounds()
          resetTorch()
          ensureAnimation()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)
    updateBounds()
    resetTorch()

    section.addEventListener('pointerenter', handlePointerEnter)
    section.addEventListener('pointermove', handlePointerMove)
    section.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', updateBounds)
    window.addEventListener('scroll', updateBounds, { passive: true })

    return () => {
      observer.disconnect()
      section.removeEventListener('pointerenter', handlePointerEnter)
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', updateBounds)
      window.removeEventListener('scroll', updateBounds)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <main ref={mainRef} className='reference-shell' id='top'>
      {/* Only show grid on non-contact sections */}
      {window.location.hash !== '#contact' && (
        <div className='reference-grid' aria-hidden='true' />
      )}
      <div className='reference-blush reference-blush-top' aria-hidden='true' />
      <div className='reference-blush reference-blush-bottom' aria-hidden='true' />
      <div className='reference-silhouette' aria-hidden='true' />

      <section className='reference-hero' id='home'>
        <header className='reference-topbar'>
          <div className='reference-brand'>VD</div>

          <div className='reference-meta'>
            <p>{temperature === null ? '--' : temperature}°C DELHI</p>
            <p>
              <span className='reference-dot' />
              {indiaNow.time} IST
            </p>
            <p>{indiaNow.day} INDIA</p>
          </div>

          <button
            ref={menuButtonRef}
            type='button'
            className='reference-menu'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls='staggered-menu-panel'
            onClick={() => menuRef.current?.toggleMenu()}
          >
            <span />
            <span />
          </button>
        </header>

        <div className='reference-copy'>
          <div className='reference-copy-left'>
            <h1 className='reference-title' id='title'>
              <span>CREATIVE</span>
              <span>DEVELOPER *</span>
            </h1>
          </div>

          <div className='reference-copy-right'>
            <p className='reference-name' id='name'>
              <span>VASU</span>
              <span>DEV</span>
            </p>
          </div>
        </div>

        <footer className='reference-ticker' aria-label='Professional roles'>
          <div className='reference-ticker-track'>
            {[0, 1].map((sequence) => (
              <div
                key={sequence}
                className='reference-ticker-sequence'
                aria-hidden={sequence === 1}
              >
                {marqueeSequence.map((item, index) => (
                  <div key={`${sequence}-${item}-${index}`} className='reference-ticker-group'>
                    <span className='reference-star'>*</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </footer>
      </section>

      <section ref={aboutSectionRef} className='about-section' id='about'>
        <div ref={aboutTorchGlowRef} className='about-torch-glow' aria-hidden='true' />
        <div ref={aboutTorchRef} className='about-torch' aria-hidden='true'>
          <img src='/assets/torch.webp' alt='' />
        </div>
        <div className='about-shell'>
          <div className='about-title-wrap'>
            <h2 className='about-title' aria-label='About me'>
              <span className='about-title-line opacity-100'>About</span>
              <span className='about-title-break' aria-hidden='true' />
              <span className='about-title-accent'>
                <span className='about-title-accent-label'>Vasu</span>
                <AnimateSvg
                  width='100%'
                  height='100%'
                  viewBox='0 0 340 140'
                  className='about-title-accent-ring'
                  strokeColor='#EFBF04'
                  strokeWidth={5}
                  animationDuration={1.8}
                  animationBounce={0.2}
                  triggerOnView
                  enableHoverAnimation
                  hoverAnimationType='redraw'
                  hoverStrokeColor='#F7D84A'
                  paths={[
                    {
                      d: 'M31 73C42 28 123 7 195 15C266 23 321 50 309 84C297 118 223 129 149 122C77 115 18 97 31 73Z',
                    },
                  ]}
                />
              </span> Dev
            </h2>
          </div>

          <div className='about-copy'>
            <div className='about-image-frame'>
              <img className='about-image' src={wrathImage} alt='Portrait for about section' />
            </div>

            <p className='about-lead'>
              I design and build interactive web experiences that balance
              visual direction, motion, and clean frontend execution.
            </p>


            <p className='about-body'>
              My work sits between design and development, turning references,
              ideas, and rough concepts into polished interfaces that feel
              expressive, responsive, and clear.
            </p>

            <p className='about-body'>
              From layout systems to interaction details, I focus on showcasing
              personality through code and building products that look distinct
              while still feeling smooth and usable.
            </p>
          </div>
        </div>
      </section>

      <section className='projects-section' id='skills'>
        <div className='projects-shell'>
          <div className='projects-topline'>
            <button type='button' className='projects-filter' aria-label='Skills filter set to all'>
            </button>
            <h2 className='projects-title'>
              <span>Skill</span>
              <span className='projects-title-accent'>Orbits</span>
            </h2>

            <div className='projects-orbit-shell' aria-label='Skills orbit'>
              <div className='projects-orbit'>
                <div className='projects-orbit-core'>
                  <span className='font-bold font-mono text-[#e6d283]'>Tech</span>
                  <span className='font-bold font-mono text-[#efbf04]'>Skills</span>
                </div>

                <OrbitingCircles
                  radius={98}
                  duration={20}
                  iconSize={58}
                  angles={skillOrbitAngles}
                  className='projects-orbit-ring'
                  itemClassName='projects-orbit-track-item'
                  pathClassName='projects-orbit-ring-path'
                >
                  {skillOrbitItems.map(({ label, icon }) => (
                    <div key={label} className='projects-orbit-item group relative' aria-label={label}>
                      {icon}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1412] text-[#efbf04] text-[0.7rem] uppercase tracking-wider py-1.5 px-3 rounded-full border border-[rgba(246,239,201,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none drop-shadow-md z-50 whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </OrbitingCircles>

                <OrbitingCircles
                  radius={146}
                  duration={26}
                  reverse
                  iconSize={14}
                  className='projects-orbit-dot projects-orbit-dot-mid'
                  itemClassName='projects-orbit-dot-item'
                  pathClassName='projects-orbit-dot-path'
                >
                  {roleItems.slice(0, 4).map(item => (
                    <span key={item} aria-hidden='true' />
                  ))}
                </OrbitingCircles>

                <OrbitingCircles
                  radius={196}
                  duration={34}
                  iconSize={46}
                  className='projects-orbit-ring'
                  itemClassName='projects-orbit-track-item'
                  pathClassName='projects-orbit-ring-path'
                >
                  {outerOrbitItems.map(({ label, icon }) => (
                    <div key={label} className='projects-orbit-item group relative' aria-label={label}>
                      {icon}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1412] text-[#efbf04] text-[0.7rem] uppercase tracking-wider py-1.5 px-3 rounded-full border border-[rgba(246,239,201,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none drop-shadow-md z-50 whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </OrbitingCircles>
              </div>
            </div>
          </div>
        </div>
      </section>


      <ProjectsSection />


      {/* VASUDEV Large Gradient Text Section */}
      <section
        id="contact"
        className="vasudev-gradient-container"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to('.vasudev-text-giant', {
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`,
            '--mask-size': '220px',
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }}
        onMouseLeave={() => {
          gsap.to('.vasudev-text-giant', {
            '--mask-size': '0px',
            duration: 0.8,
            ease: 'power2.inOut'
          });
        }}
      >
        <div className="vasudev-text-giant">VASUDEV</div>
      </section>

      <StaggeredMenu
        ref={menuRef}
        className='reference-staggered-menu'
        position='right'
        isFixed
        showHeader={false}
        externalToggleRef={menuButtonRef}
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={false}
        colors={['#050505', '#111111', '#1a1a1a']}
        accentColor='#ffffff'
        menuButtonColor='#595349'
        openMenuButtonColor='#595349'
        changeMenuColorOnOpen={false}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />
    </main>
  )
}

export default Home
