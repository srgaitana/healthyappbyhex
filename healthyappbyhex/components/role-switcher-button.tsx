"use client"

import { useRole } from "@/components/role-context"
import { Button } from "@/components/ui/button"
import { UserRound, Stethoscope, ArrowLeftRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Logo } from "@/components/logo"

export function RoleSwitcherButton() {
  const { role, setRole } = useRole()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleRole = () => {
    const newRole = role === "patient" ? "professional" : "patient"
    setRole(newRole)
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 bg-card shadow-lg rounded-lg p-3 border"
          >
            <div className="flex flex-col gap-2 w-48">
              <Button
                variant={role === "patient" ? "default" : "outline"}
                size="sm"
                className="justify-start gap-2"
                onClick={() => {
                  setRole("patient")
                  setIsExpanded(false)
                }}
              >
                <UserRound size={16} />
                <span>Modo Paciente</span>
              </Button>
              <Button
                variant={role === "professional" ? "default" : "outline"}
                size="sm"
                className="justify-start gap-2"
                onClick={() => {
                  setRole("professional")
                  setIsExpanded(false)
                }}
              >
                <Stethoscope size={16} />
                <span>Modo Profesional</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: role === "professional" ? "hsl(142 50% 25%)" : "hsl(196 100% 47%)",
          }}
        >
          {isExpanded ? <ArrowLeftRight className="h-6 w-6" /> : <Logo color="white" size={24} />}
        </Button>
      </motion.div>
    </div>
  )
}

