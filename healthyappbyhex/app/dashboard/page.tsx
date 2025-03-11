"use client"

import { Header } from "@/components/header"
import { useRole } from "@/components/role-context"
import { PatientDashboard } from "@/app/dashboard/patient-dashboard"
import { ProfessionalDashboard } from "@/app/dashboard/professional-dashboard"
import { RoleSwitcherButton } from "@/components/role-switcher-button"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { role } = useRole()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <motion.main
        className="flex-1"
        initial={{ opacity: 0, x: role === "patient" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        key={role} // This forces re-render and animation when role changes
      >
        {role === "patient" ? <PatientDashboard /> : <ProfessionalDashboard />}
      </motion.main>

      <RoleSwitcherButton />

      <footer className="border-t py-4">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">Demo con datos ficticios - Producto en desarrollo</p>
        </div>
      </footer>
    </div>
  )
}

