import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Preloader = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // We select all columns inside the container
    const columns = containerRef.current.querySelectorAll('.preloader-col')

    // Create a GSAP timeline
    const tl = gsap.timeline()

    // Animation: Double staircase stagger effect
    // By animating scaleY from 1 to 0 (origin bottom or top)
    tl.to(columns, {
      scaleY: 0,
      transformOrigin: 'bottom',
      ease: 'power4.inOut',
      stagger: {
        amount: 0.8,
        from: 'edges', // Reversed the stagger to start from outside inwards
      },
      duration: 1.2,
      delay: 0.2, // A short delay so we actually 'see' the loading state momentarily
    })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Completely remove the element from view so it doesn't block interactions
          containerRef.current.style.display = 'none'
        }
      }, '-=0.2') // Starts slightly before the scale finishes

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex w-full h-screen pointer-events-none"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="preloader-col flex-1 h-full bg-[#111]"
        />
      ))}
    </div>
  )
}

export default Preloader
