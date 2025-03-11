"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"

export default function IntroPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to role selection after animation
    const timeout = setTimeout(() => {
      router.push("/welcome")
    }, 3000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-primary-foreground">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo className="mx-auto mb-8" color="currentColor" size={80} />

        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Healthy
        </motion.h1>

        <motion.p
          className="text-xl max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Gestión de citas médicas simple y eficiente. Agenda, administra y da seguimiento a tus consultas médicas.
        </motion.p>
      </motion.div>
    </div>
  )
}

