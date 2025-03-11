"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Role = "patient" | "professional"

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("patient")

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as Role
    if (savedRole && (savedRole === "patient" || savedRole === "professional")) {
      setRole(savedRole)
    }
  }, [])

  // Save role to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userRole", role)

    // Apply theme class to body based on role
    if (role === "patient") {
      document.body.classList.add("patient-theme")
      document.body.classList.remove("professional-theme")
    } else {
      document.body.classList.add("professional-theme")
      document.body.classList.remove("patient-theme")
    }
  }, [role])

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

