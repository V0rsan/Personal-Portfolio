import { motion, useAnimationControls } from 'motion/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export const AnimateSvg = ({
  width,
  height,
  viewBox,
  className,
  path,
  paths = [],
  strokeColor = '#EFBF04',
  strokeWidth = 3,
  strokeLinecap = 'round',
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  staggerDelay = 0.2,
  reverseAnimation = false,
  enableHoverAnimation = false,
  hoverAnimationType = 'redraw',
  hoverStrokeColor = '#4f46e5',
  initialAnimation = true,
  triggerOnView = false,
  viewThreshold = 0.45,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(() =>
    triggerOnView ? 0 : initialAnimation ? 1 : 0
  )
  const svgRef = useRef(null)
  const MotionSvg = motion.svg
  const MotionPath = motion.path

  const normalizedPaths = useMemo(() => {
    if (paths.length > 0) return paths
    if (path) {
      return [
        {
          d: path,
          stroke: strokeColor,
          strokeWidth,
          strokeLinecap,
        },
      ]
    }
    return []
  }, [paths, path, strokeColor, strokeWidth, strokeLinecap])

  useEffect(() => {
    if (!triggerOnView) {
      return undefined
    }

    const svgElement = svgRef.current
    if (!svgElement) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationCycle(cycle => cycle + 1)
        }
      },
      { threshold: viewThreshold }
    )

    observer.observe(svgElement)

    return () => {
      observer.disconnect()
    }
  }, [triggerOnView, viewThreshold])

  const getPathVariants = index => ({
    hidden: {
      pathLength: 0,
      opacity: 0,
      pathOffset: reverseAnimation ? 1 : 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      pathOffset: 0,
      transition: {
        pathLength: {
          type: 'spring',
          duration: animationDuration,
          bounce: animationBounce,
          delay: animationDelay + index * staggerDelay,
        },
        pathOffset: {
          duration: animationDuration,
          delay: animationDelay + index * staggerDelay,
        },
        opacity: {
          duration: animationDuration / 4,
          delay: animationDelay + index * staggerDelay,
        },
      },
    },
  })

  if (normalizedPaths.length === 0) return null

  return (
    <MotionSvg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      initial={initialAnimation ? 'hidden' : 'visible'}
      animate='visible'
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileHover={enableHoverAnimation && hoverAnimationType !== 'redraw' ? { scale: 1.05 } : {}}
    >
      {normalizedPaths.map((pathData, index) => (
        <AnimatedPath
          key={`${pathData.d}-${index}`}
          pathData={pathData}
          index={index}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          initialAnimation={initialAnimation}
          animationCycle={animationCycle}
          pathVariants={getPathVariants(index)}
          isHovering={isHovering && enableHoverAnimation}
          hoverAnimationType={hoverAnimationType}
          hoverStrokeColor={hoverStrokeColor}
          totalPaths={normalizedPaths.length}
          MotionPath={MotionPath}
        />
      ))}
    </MotionSvg>
  )
}

const AnimatedPath = ({
  pathData,
  index,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  initialAnimation,
  animationCycle,
  pathVariants,
  isHovering,
  hoverAnimationType,
  hoverStrokeColor,
  totalPaths,
  MotionPath,
}) => {
  const controls = useAnimationControls()
  const originalColor = pathData.stroke || strokeColor

  useEffect(() => {
    if (!isHovering) {
      controls.stop()
      if (animationCycle > 0 && initialAnimation) {
        controls.set('hidden')
        controls.start('visible')
      } else {
        controls.set('visible')
      }
      return
    }

    switch (hoverAnimationType) {
      case 'redraw':
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: 'easeInOut',
            },
          },
        })
        break
      case 'float':
        controls.start({
          y: [0, -2, 0],
          transition: {
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: 'easeInOut',
            },
          },
        })
        break
      case 'pulse':
        controls.start({
          scale: [1, 1.03, 1],
          transition: {
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.3,
              ease: 'easeInOut',
            },
          },
        })
        break
      case 'color':
        controls.start({
          stroke: [originalColor, hoverStrokeColor || strokeColor, originalColor],
          transition: {
            stroke: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: 'easeInOut',
            },
          },
        })
        break
      case 'sequential':
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: (index / Math.max(totalPaths, 1)) * 2,
              ease: 'easeInOut',
            },
          },
        })
        break
      default:
        break
    }
  }, [
    controls,
    hoverAnimationType,
    hoverStrokeColor,
    index,
    animationCycle,
    initialAnimation,
    isHovering,
    originalColor,
    strokeColor,
    totalPaths,
  ])

  return React.createElement(MotionPath, {
    d: pathData.d,
    stroke: pathData.stroke ?? strokeColor,
    strokeWidth: pathData.strokeWidth ?? strokeWidth,
    strokeLinecap: pathData.strokeLinecap ?? strokeLinecap,
    initial: initialAnimation ? 'hidden' : 'visible',
    animate: controls,
    variants: pathVariants,
  })
}
