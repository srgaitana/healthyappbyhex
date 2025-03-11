"use client"

import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  color?: string
  size?: number
}

export function Logo({ className = "", color = "currentColor", size = 40 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Plus sign */}
      <motion.path
        d="M20 8V32M8 20H32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      {/* Corrected forward slash (from top-left to bottom-right) */}
      <motion.path
        d="M10 10L30 30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
    </motion.svg>
  )
}

