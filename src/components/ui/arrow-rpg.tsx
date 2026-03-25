import React from "react";

export const ArrowRPG = ({ className = "", ...props }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 16H26M26 16L18 8M26 16L18 24"
      stroke="url(#rpg-gradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="rpg-gradient" x1="6" y1="16" x2="26" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#efbf04" />
        <stop offset="1" stopColor="#fffbe6" />
      </linearGradient>
    </defs>
  </svg>
);
