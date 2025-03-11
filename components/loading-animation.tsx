"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <motion.div
        className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

