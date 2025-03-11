"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <Logo color="hsl(196 100% 47%)" size={64} />
      <motion.h2
        className="text-2xl font-bold mt-8 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Healthy
      </motion.h2>
      <motion.p
        className="text-center max-w-md text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Simplificando la gestión de citas médicas y unificando historias clínicas para una atención de salud más
        eficiente.
      </motion.p>
    </div>
  )
}

