"use client"

import { useRole } from "@/components/role-context"
import { Button } from "@/components/ui/button"
import { UserRound, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"

export function RoleSwitcher() {
  const { role, setRole } = useRole()

  return (
    <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
      <Button
        variant={role === "patient" ? "default" : "ghost"}
        size="sm"
        className="rounded-full gap-2"
        onClick={() => setRole("patient")}
      >
        <UserRound size={16} />
        <span>Paciente</span>
        {role === "patient" && (
          <motion.div
            layoutId="pill-indicator"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Button>
      <Button
        variant={role === "professional" ? "default" : "ghost"}
        size="sm"
        className="rounded-full gap-2"
        onClick={() => setRole("professional")}
      >
        <Stethoscope size={16} />
        <span>Profesional</span>
        {role === "professional" && (
          <motion.div
            layoutId="pill-indicator"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Button>
    </div>
  )
}

