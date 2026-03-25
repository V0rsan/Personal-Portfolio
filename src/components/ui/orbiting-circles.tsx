import React from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  itemClassName?: string
  pathClassName?: string
  children?: React.ReactNode
  angles?: number[]
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  itemClassName,
  pathClassName,
  children,
  angles,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 50,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  return (
    <div className={cn("absolute inset-0", className)}>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className={cn("stroke-black/10 stroke-1 dark:stroke-white/10", pathClassName)}
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = angles?.[index] ?? (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                top: "calc(50% - (var(--icon-size) / 2))",
                left: "calc(50% - (var(--icon-size) / 2))",
              } as React.CSSProperties
            }
            className={cn(
              `animate-orbit absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              itemClassName
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
